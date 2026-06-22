// Lightweight DOCX text extractor - parses the ZIP file manually using node's built-in zlib.
// DOCX files are ZIPs. We look for "word/document.xml" entry and decompress it.
export async function extractDocx(buffer: Buffer): Promise<string> {
  try {
    const zlib = await import("zlib");
    const entries = parseZipCentralDirectory(buffer);
    const doc = entries.find((e) => e.filename === "word/document.xml");
    if (!doc) return "";

    const localHeader = readLocalFileHeader(buffer, doc.localHeaderOffset);
    const fileData = buffer.slice(
      localHeader.dataStart,
      localHeader.dataStart + doc.compressedSize
    );

    let inflated: Buffer;
    if (doc.compressionMethod === 8) {
      inflated = zlib.inflateRawSync(fileData);
    } else {
      inflated = fileData;
    }

    const xml = inflated.toString("utf-8");
    return parseDocxXml(xml);
  } catch (e: any) {
    return "";
  }
}

function parseDocxXml(xml: string): string {
  return xml
    .replace(/<w:p[^>]*>/g, "\n")
    .replace(/<w:tab[^>]*>/g, "\t")
    .replace(/<w:br[^>]*>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\u00a0/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

interface ZipEntry {
  filename: string;
  compressedSize: number;
  uncompressedSize: number;
  compressionMethod: number;
  localHeaderOffset: number;
}

function parseZipCentralDirectory(buf: Buffer): ZipEntry[] {
  const endRecord = findEndOfCentralDirectory(buf);
  if (!endRecord) return [];
  const entries: ZipEntry[] = [];
  let offset = endRecord.centralDirOffset;
  for (let i = 0; i < endRecord.numEntries; i++) {
    if (offset + 4 > buf.length) break;
    const sig = buf.readUInt32LE(offset);
    if (sig !== 0x02014b50) break;
    const compressionMethod = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const uncompressedSize = buf.readUInt32LE(offset + 24);
    const nameLen = buf.readUInt16LE(offset + 28);
    const extraLen = buf.readUInt16LE(offset + 30);
    const commentLen = buf.readUInt16LE(offset + 32);
    const localHeaderOffset = buf.readUInt32LE(offset + 42);
    const filename = buf.slice(offset + 46, offset + 46 + nameLen).toString("utf-8");
    entries.push({ filename, compressedSize, uncompressedSize, compressionMethod, localHeaderOffset });
    offset += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

function findEndOfCentralDirectory(buf: Buffer): {
  centralDirOffset: number;
  numEntries: number;
} | null {
  const start = Math.max(0, buf.length - 65557);
  for (let i = buf.length - 22; i >= start; i--) {
    if (
      buf[i] === 0x50 &&
      buf[i + 1] === 0x4b &&
      buf[i + 2] === 0x05 &&
      buf[i + 3] === 0x06
    ) {
      const numEntries = buf.readUInt16LE(i + 10);
      const centralDirOffset = buf.readUInt32LE(i + 16);
      return { numEntries, centralDirOffset };
    }
  }
  return null;
}

function readLocalFileHeader(buf: Buffer, offset: number): { dataStart: number } {
  if (offset + 30 > buf.length) return { dataStart: offset };
  const nameLen = buf.readUInt16LE(offset + 26);
  const extraLen = buf.readUInt16LE(offset + 28);
  return { dataStart: offset + 30 + nameLen + extraLen };
}
