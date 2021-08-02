import os

path = "./svgs"
files = sorted(os.listdir(path))
svgList = []
files.remove("index.ts")
for f in files:
    # print(f)
    f = f.replace(".svg", "")
    arrWord = f.split("-")
    for i in range(len(arrWord)):
        arrWord[i] = arrWord[i].capitalize()
    iconName = "".join(arrWord)
    line = 'export { default as ' + iconName + ' } from "./' + f + '.svg";\n'
    svgList.append(line)
# print(svgList)

f = open(path + "/index.ts", "w")
f.writelines(svgList)
