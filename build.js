import fs from "fs"

let file = fs.readFileSync("./dist/manifest.json", "utf-8")
let json = JSON.parse(file)

json.start_url = '/skyblock-nexus/' 

file = JSON.stringify(json, null, 2)
fs.writeFileSync("./dist/manifest.json", file)