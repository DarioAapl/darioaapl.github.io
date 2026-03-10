import re

with open("index.html", "r") as f:
    content = f.read()

# Replace the style="padding: 10px 15px; font-size: 0.9rem;" inside the links
content = re.sub(r'<a class="amz-btn" style="padding: 10px 15px; font-size: 0.9rem;" href="([^"]+)" target="_blank" rel="noopener">([^<]+)</a>',
                 r'<a href="\1" target="_blank" rel="noopener" class="amz-btn">\n      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>\n      Amazon \2\n    </a>',
                 content)

# Fix double spacing in names like "Amazon 🇪🇸 Spain" since the original only has "Amazon ��🇪"
# Actually I'll keep the full country name because it's nice to read, but let's make it look like "Amazon 🇪🇸 Spain"

with open("index.html", "w") as f:
    f.write(content)

