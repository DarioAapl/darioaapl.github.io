import re

with open("index.html", "r") as f:
    content = f.read()

# Fix spacing in link names like "Amazon 🇪🇸 Spain" -> "Amazon 🇪🇸" to exactly match "Amazon 🇩��"
# Let's see what the links are exactly
links = re.findall(r'<a href="[^"]+" target="_blank" rel="noopener" class="amz-btn">\s*<svg.*?</svg>\s*Amazon ([^<]+?)\s*</a>', content)
print("Found links:", links)

# The flag is the first char (or two unicode chars) of the text
# Actually, the user had "��🇸 Spain", so the text matched by \2 was "🇪🇸 Spain"
# Let's replace "🇪🇸 Spain" with "🇪🇸" etc.
content = content.replace("Amazon 🇪🇸 Spain", "Amazon 🇪🇸")
content = content.replace("Amazon 🇮�� Italy", "Amazon 🇮🇹")
content = content.replace("Amazon 🇳🇱 Netherlands", "Amazon 🇳🇱")
content = content.replace("Amazon 🇵🇱 Poland", "Amazon ��🇱")
content = content.replace("Amazon 🇸🇪 Sweden", "Amazon 🇸🇪")
content = content.replace("Amazon 🇧🇪 Belgium", "Amazon 🇧🇪")
content = content.replace("Amazon 🇮🇪 Ireland", "Amazon 🇮🇪")
content = content.replace("Amazon 🇯🇵 Japan", "Amazon 🇯🇵")
content = content.replace("Amazon 🇨🇦 Canada", "Amazon 🇨🇦")
content = content.replace("Amazon 🇦🇺 Australia", "Amazon 🇦🇺")

# We should also fix spacing in the main section:
# Currently they have  "Amazon 🇩🇪" inside .amz-btn
# My python script replaced \n      Amazon \2\n -> if \2 was "🇪🇸 Spain", it became "Amazon 🇪🇸 Spain"
# Now it's "Amazon 🇪🇸"

with open("index.html", "w") as f:
    f.write(content)

