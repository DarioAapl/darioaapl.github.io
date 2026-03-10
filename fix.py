import sys, re

with open("index.html", "r") as f:
    content = f.read()

# Make the window expand on click
new_onclick = "document.querySelector('.book-window').classList.toggle('expanded')"
content = content.replace('onclick="toggleAmzFlyout(event)"', f'onclick="{new_onclick}"')

# Extract flyout links
flyout_match = re.search(r'<div id="amz-flyout">(.*?)</div>', content, re.DOTALL)
if flyout_match:
    links = flyout_match.group(1)
    
    # Clean up the flyout container from end of body
    content = re.sub(r'<!-- Amazon country flyout.*?<div id="amz-flyout">.*?</div>', '', content, flags=re.DOTALL)
    
    # We want these links inside the book window
    # Make them look like the standard buttons
    links = links.replace('<a href=', '<a class="amz-btn" style="padding: 10px 15px; font-size: 0.9rem;" href=')
    
    other_countries_html = f"""
  <div class="other-countries">
    {links}
  </div>
"""
    # Insert right after the amz-more div
    content = content.replace("More countries ▾\n    </button>\n  </div>", "More countries ▾\n    </button>\n  </div>" + other_countries_html)

# Add CSS
css_append = """
.other-countries { display: none; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }
.book-window.expanded .other-countries { display: grid; }
.book-window.expanded { max-height: none; }
.social-links { margin-top: 40px; margin-bottom: 20px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 10; }
.social-links a { color: var(--neon); text-decoration: none; font-family: 'Orbitron', sans-serif; font-size: 1rem; padding: 10px 20px; border: 1px solid rgba(0,212,255,0.3); border-radius: 8px; background: rgba(0,212,255,0.05); transition: all 0.3s ease; backdrop-filter: blur(5px); }
.social-links a:hover { background: rgba(0,212,255,0.2); box-shadow: 0 0 10px rgba(0,212,255,0.4); transform: translateY(-2px); color: #fff; }
"""
content = content.replace("</style>", css_append + "\n</style>")

# Insert social links at the bottom of the container
social_html = """
    <div class="social-links">
      <a href="https://instagram.com/darioaapl" target="_blank">Instagram</a>
      <a href="https://www.linkedin.com/in/dario-tino-412262223?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank">LinkedIn</a>
      <a href="https://bsky.app/profile/darioaapl.bsky.social" target="_blank">Bluesky</a>
      <a href="https://github.com/darioaapl" target="_blank">GitHub</a>
    </div>
"""
content = re.sub(r'(<script>\s*// Terminal typing effect)', social_html + r'\n\1', content)

# Remove flyout JS logic
content = re.sub(r'function toggleAmzFlyout\(e\).*?fly\.classList\.add\(\'open\'\);\n\}', '', content, flags=re.DOTALL)
content = re.sub(r'document\.addEventListener\(\'click\', function\(e\).*?\}\);', '', content, flags=re.DOTALL)
content = re.sub(r'window\.addEventListener\(\'scroll\', function\(\).*?\}, \{passive:true\}\);', '', content, flags=re.DOTALL)

with open("index.html", "w") as f:
    f.write(content)

