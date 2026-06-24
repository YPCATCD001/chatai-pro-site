from playwright.sync_api import sync_playwright
import sys

def test_app():
    errors = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Listen for console errors
        console_errors = []
        page.on("console", lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == "error" else None)
        
        # 1. Test Login Page
        print("Test 1: Login Page...")
        page.goto('http://localhost:3333/login')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/login.png', full_page=True)
        
        # Check login form exists
        login_form = page.locator('form').first
        if login_form.count() > 0:
            print("  ✓ Login form found")
        else:
            errors.append("Login form not found")
            print("  ✗ Login form not found")
        
        # Check theme toggle exists
        print("Test 2: Theme Toggle (need to login first)...")
        
        # 2. Test Register Page
        print("Test 3: Register Page...")
        page.goto('http://localhost:3333/register')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/register.png', full_page=True)
        
        register_form = page.locator('form').first
        if register_form.count() > 0:
            print("  ✓ Register form found")
        else:
            errors.append("Register form not found")
            print("  ✗ Register form not found")
        
        # 3. Test Dashboard (may redirect to login)
        print("Test 4: Dashboard Page...")
        page.goto('http://localhost:3333/dashboard')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/dashboard.png', full_page=True)
        
        # 4. Test Bots Page
        print("Test 5: Bots Page...")
        page.goto('http://localhost:3333/bots')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/bots.png', full_page=True)
        
        # 5. Test Pricing Page
        print("Test 6: Pricing Page...")
        page.goto('http://localhost:3333/pricing')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/pricing.png', full_page=True)
        
        # Report console errors
        if console_errors:
            print(f"\nConsole Errors ({len(console_errors)}):")
            for err in console_errors[:5]:
                print(f"  {err}")
                errors.append(err)
        else:
            print("\n✓ No console errors detected")
        
        browser.close()
        
        # Save screenshots
        print("\nScreenshots saved:")
        print("  - /tmp/login.png")
        print("  - /tmp/register.png")
        print("  - /tmp/dashboard.png")
        print("  - /tmp/bots.png")
        print("  - /tmp/pricing.png")
        
        if errors:
            print(f"\n✗ {len(errors)} error(s) found")
            return 1
        else:
            print("\n✓ All tests passed!")
            return 0

if __name__ == "__main__":
    sys.exit(test_app())
