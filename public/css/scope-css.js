// Reference the dependencies for this script
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const prefixSelector = require("postcss-prefix-selector");

// The path containing unscoped CSS files
const inputDir = "./css";

// Get list of unscoped CSS
function getCssFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith(".css") && !file.endsWith(".scoped.css"));
}

// Get the scoping class name from the file name
function makePrefix(file) {
  const name = path.basename(file, ".css");
  return `.${name}`;
}

// The rule that scopes the CSS
function transformSelector(prefix, selector, prefixedSelector) {
  return prefixedSelector;
}

// Scope and output a CSS file
async function processFile(file) {
  const filePath = path.join(inputDir, file);
  const css = fs.readFileSync(filePath, "utf8");
  const prefix = makePrefix(file);
  const outputFile = path.join(inputDir, `${path.basename(file, ".css")}.scoped.css`);
  const result = await postcss([
    prefixSelector({ prefix, transform: transformSelector })
  ]).process(css, { from: filePath });
  fs.writeFileSync(outputFile, result.css, "utf8");
}

// The main loop
async function run() {
  const files = getCssFiles(inputDir);
  for (const file of files) {
    await processFile(file);
  }
}

// Some error handling
run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});