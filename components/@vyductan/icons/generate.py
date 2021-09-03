import os
import shutil

svgsFolderPath = "./svgs"
libFolderPath = "./lib"

# prepare
shutil.rmtree(libFolderPath, ignore_errors=True)
os.mkdir(libFolderPath)
os.remove("index.ts")
os.remove("./components/typings.ts")

filesIcons = sorted(os.listdir(svgsFolderPath))
svgList = [
    'export { default } from "./components/Icon";',
    '\nexport type { IconName } from "./components/typings";'
]
iconNameList = ['export type IconName =']

# get data
for f in filesIcons:
    # print(f)
    f = f.replace(".svg", "")
    arrWord = f.split("-")
    for i in range(len(arrWord)):
        arrWord[i] = arrWord[i].capitalize()
    iconName = "".join(arrWord)
    iconComponent = iconName + "Icon"
    exportSvgLine = '\nexport { default as ' + iconComponent + ' } from "' + libFolderPath + '/' + iconComponent + '";'
    svgList.append(exportSvgLine)
    iconNameList.append('\n\t| "' + iconName + '"')

    # Create file Tsx for each Svg
    tsxContent = [
        'import { SVGProps } from "react";',
        '\nimport Svg from "../svgs/' + f + '.svg";',
        '\n',
        '\nconst ' + iconComponent + ' = (props: SVGProps<SVGElement>) => (',
        '\n\t<Svg',
        '\n\t\tdata-icon="' + f + '"',
        '\n\t\twidth="1em"',
        '\n\t\theight="1em"',
        '\n\t\taria-hidden="true"',
        '\n\t\tfill="currentcolor"',
        '\n\t\t{...props}',
        '\n\t/>',
        '\n);',
        '\n',
        '\nexport default ' + iconComponent + ';',
    ]

    tsxFile = open(libFolderPath + "/" + iconComponent + ".tsx", "w")
    tsxFile.writelines(tsxContent)
# print(svgList)

f = open("index.ts", "w")
f.writelines(svgList)

f = open("./components/typings.ts", "w")
f.writelines(iconNameList)
