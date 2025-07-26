const { parse } = require("svgson");
const fs = require("fs");
const path = require("path");

const folderPath = process.argv[2];

let count = 0;

const processFiles = async () => {
  try {
    await fs.promises.writeFile("./db.json", "[");

    for (const fileName of fs.readdirSync(folderPath)) {
      const fullPath = path.join(folderPath, fileName);
      const data = await fs.promises.readFile(fullPath, "utf-8");
      const json = await parse(data);
      for (const child of json.children) {
        child.attributes["data-name"] = child.attributes.id;
        delete child.attributes.id;
      }
      const vector =
        JSON.stringify({ id: count, name: fileName, vector: json }, null, 2) + "," + "\n";
      await fs.promises.appendFile("./db.json", vector);
      count += 1;
    }

    await fs.promises.appendFile("./db.json", "]");
  } catch (err) {
    console.error("Error: ", err);
  }
};

processFiles();
