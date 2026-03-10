import re

with open("index.html", "r") as f:
    content = f.read()

# Replace the text "Amazon X CountryName" with "Amazon X"
content = re.sub(r'(Amazon [^\s]+) [a-zA-Z]+', r'\1', content)

with open("index.html", "w") as f:
    f.write(content)
