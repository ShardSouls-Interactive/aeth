const fs = require("fs");
const { XMLParser } = require("fast-xml-parser");

function badwords(filePath) {
  const xml = fs.readFileSync(filePath, "utf-8");
  const parser = new XMLParser();
  const data = parser.parse(xml);

  let words = data.badwords?.word;

  if (!Array.isArray(words)) words = [words];

return words
  .map(w => typeof w === "string" ? w : w['#text'])
  .filter(w => typeof w === "string" && w.trim().length > 1)
  .map(w => w.toLowerCase().trim());
}

module.exports = badwords;