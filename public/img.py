import os
import re
from PIL import Image

def create_low_quality_images(directory="."):
    # Regular expression to match files like h1.png, h12.jpg, h3.webp, etc.
    # It looks for 'h' followed by numbers, a dot, and a valid image extension.
    pattern = re.compile(r'^h\d+\.(png|jpg|jpeg|webp|bmp)$', re.IGNORECASE)
    
    # Counter to keep track of processed files
    processed_count = 0

    print(f"Scanning directory: {os.path.abspath(directory)}\n" + "-"*40)

    for filename in os.listdir(directory):
        if pattern.match(filename):
            filepath = os.path.join(directory, filename)
            
            try:
                with Image.open(filepath) as img:
                    # Create the new filename (e.g., h1.png -> h1_low.png)
                    name, ext = os.path.splitext(filename)
                    new_filename = f"{name}_low{ext}"
                    new_filepath = os.path.join(directory, new_filename)

                    # Skip if the low-res version already exists
                    if os.path.exists(new_filepath):
                        print(f"Skipping: {new_filename} (Already exists)")
                        continue

                    # 1. Resize the image (reduces dimensions by 50%)
                    new_size = (max(1, img.width // 2), max(1, img.height // 2))
                    
                    # Convert RGBA (transparent) to RGB if saving as JPEG to prevent errors
                    if img.mode in ("RGBA", "P") and ext.lower() in ('.jpg', '.jpeg'):
                        img = img.convert("RGB")
                        
                    resized_img = img.resize(new_size, Image.Resampling.LANCZOS)

                    # 2. Save the image with reduced quality (Targeting 30% quality)
                    if ext.lower() in ('.jpg', '.jpeg', '.webp'):
                        resized_img.save(new_filepath, quality=30, optimize=True)
                    else:
                        # PNGs and BMPs don't use 'quality' compression in the same way, 
                        # but the 50% resize will still significantly drop the file size.
                        resized_img.save(new_filepath, optimize=True)

                    print(f"Success: Created {new_filename}")
                    processed_count += 1

            except Exception as e:
                print(f"Error processing {filename}: {e}")

    print("-" * 40)
    print(f"Done! Successfully processed {processed_count} images.")

if __name__ == "__main__":
    create_low_quality_images()