from PIL import Image
import sys

src = r"C:\Users\jaane\.openclaw\media\tool-image-generation\favicon-source---0171fb7a-1ee4-4577-a909-f92af385085a.png"
img = Image.open(src)

# Apple touch icon 180x180
img.resize((180, 180), Image.LANCZOS).save(r"public\apple-touch-icon.png")
print("apple-touch-icon.png created")

# Favicon ICO with multiple sizes
sizes = [(16, 16), (32, 32), (48, 48)]
imgs = [img.resize(s, Image.LANCZOS) for s in sizes]
imgs[0].save(r"public\favicon.ico", format="ICO", sizes=sizes)
print("favicon.ico created")
