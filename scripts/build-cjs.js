import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "../dist");

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      walkDir(filepath);
    } else if (file.endsWith(".js")) {
      let content = fs.readFileSync(filepath, "utf-8");

      // Convert ES imports to CommonJS
      content = content
        .replace(
          /import\s+(?:{([^}]+)}|(\*\s+as\s+\w+)|\w+)\s+from\s+['"]([^'"]+)['"]/g,
          (match, named, ns, source) => {
            if (ns) {
              const varName = match.match(/\*\s+as\s+(\w+)/)[1];
              return `const ${varName} = require('${source}')`;
            }
            return `const {${named}} = require('${source}')`;
          }
        )
        .replace(/export\s+{([^}]+)}/g, "module.exports = {$1}")
        .replace(
          /export\s+(default\s+)?(?:class|function|const)\s+(\w+)/g,
          "exports.$2 ="
        );

      const cjsPath = filepath.replace(/\.js$/, ".cjs");
      fs.writeFileSync(cjsPath, content);
    }
  }
}

walkDir(distDir);
console.log("CommonJS bundles created successfully");
