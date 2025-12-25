"""
Installation script for WheelEat - handles Python 3.14 compatibility
"""
import subprocess
import sys
import platform

def run_command(cmd, description):
    """Run a command and return success status"""
    print(f"\n{description}...")
    try:
        result = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        print(f"✓ {description} completed")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ {description} failed")
        print(f"  Error: {e.stderr}")
        return False

def main():
    print("=" * 60)
    print("WheelEat Installation Script")
    print("=" * 60)
    
    version_info = sys.version_info
    print(f"\nPython version: {version_info.major}.{version_info.minor}.{version_info.micro}")
    print(f"Platform: {platform.system()} {platform.machine()}")
    
    # Upgrade pip first
    if not run_command(f"{sys.executable} -m pip install --upgrade pip", "Upgrading pip"):
        print("Warning: pip upgrade failed, continuing anyway...")
    
    # Install packages one by one to handle errors better
    packages = [
        "fastapi==0.115.6",
        "uvicorn[standard]==0.34.0",
        "sqlalchemy==2.0.36",
        "python-dotenv==1.0.1",
        "python-multipart==0.0.20",
    ]
    
    print("\n" + "=" * 60)
    print("Installing base packages...")
    print("=" * 60)
    
    failed = []
    for package in packages:
        if not run_command(f"{sys.executable} -m pip install {package}", f"Installing {package.split('==')[0]}"):
            failed.append(package)
    
    if failed:
        print(f"\n⚠ Some packages failed: {', '.join(failed)}")
        print("Continuing with pydantic installation...")
    
    # Try to install pydantic - this is the tricky one for Python 3.14
    print("\n" + "=" * 60)
    print("Installing pydantic (this may take a while for Python 3.14)...")
    print("=" * 60)
    
    # Try latest version first (might have wheels)
    pydantic_attempts = [
        "pydantic>=2.10.0",
        "pydantic==2.10.4",
        "pydantic==2.9.2",
    ]
    
    pydantic_installed = False
    for pydantic_version in pydantic_attempts:
        print(f"\nTrying {pydantic_version}...")
        if run_command(f"{sys.executable} -m pip install {pydantic_version}", f"Installing {pydantic_version}"):
            pydantic_installed = True
            break
        else:
            print(f"  Failed, trying next version...")
    
    if not pydantic_installed:
        print("\n" + "=" * 60)
        print("❌ Pydantic installation failed!")
        print("=" * 60)
        print("\nFor Python 3.14, pydantic-core needs to be compiled from source.")
        print("This requires Rust to be installed.")
        print("\nOptions:")
        print("1. Install Rust: https://rustup.rs/ (takes 5-10 minutes)")
        print("2. Use Python 3.12 instead: https://www.python.org/downloads/")
        print("\nAfter installing Rust, run this script again.")
        return False
    
    print("\n" + "=" * 60)
    print("✅ Installation Complete!")
    print("=" * 60)
    print("\nYou can now start the server with:")
    print("  uvicorn main:app --reload --port 8000")
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

