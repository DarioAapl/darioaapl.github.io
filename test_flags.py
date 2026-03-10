with open("index.html", "r") as f:
    text = f.read()
import re
flags = re.findall(r'<a.*?class="amz-btn".*?>.*?Amazon (.*?)</a>', text, re.DOTALL)
for f in flags:
    print(f.strip())
