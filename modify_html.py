with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

# find engine-terminal-wrapper (start and end)
engine_start = -1
engine_end = -1
for i, line in enumerate(lines):
    if '<div class="engine-terminal-wrapper">' in line:
        engine_start = i
    if engine_start != -1 and i > engine_start and '            </div>' in line and '</div>' in line.strip():
        # actually need to match exactly the end of the wrapper. It's line 216.
        pass

# let's just find bounds by exact lines based on current state
# engine wrapper is lines 163 to 215 (0-indexed)
engine_start = 163
engine_end = 216

# terminal showcase starts at 418, ends at 567.
showcase_start = 418
showcase_end = 567

# entire section terminal is from 402 to 569.
section_start = 402
section_end = 570

# but lines may have shifted a bit if I made edits. Let's find dynamically.
for i, line in enumerate(lines):
    if '<div class="engine-terminal-wrapper">' in line: engine_start = i
    if '<div class="terminal-showcase" id="terminal-showcase">' in line: showcase_start = i
    if '<!-- ANALYSIS INTERFACE' in line: section_start = i - 1

# find ends:
# engine_end is 52 lines after engine_start
engine_end = engine_start + 53
# showcase_end is where <section id="access"> starts minus some lines, or just search up from section_start to find the closing </section>
for i in range(showcase_start, len(lines)):
    if '</section>' in lines[i]:
        section_end = i + 1
        showcase_end = i - 2
        break

showcase_content = lines[showcase_start:showcase_end+1]

new_lines = []
i = 0
while i < len(lines):
    if i == engine_start:
        new_lines.extend(showcase_content)
        i = engine_end
        continue
    
    if i >= section_start and i < section_end:
        i += 1
        continue
        
    new_lines.append(lines[i])
    i += 1

with open("index.html", "w", encoding="utf-8") as f:
    f.writelines(new_lines)
print("Done. Check index.html")
