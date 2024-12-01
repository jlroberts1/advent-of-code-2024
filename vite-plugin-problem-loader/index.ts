import * as fs from "fs";
import * as path from "path";
import type { Plugin } from "vite";

export function viteProblemLoader(): Plugin {
  const PROBLEMS_DIR = "src/problems";
  const UTILS_DIR = "src/utils";
  const LOADER_PATH = path.join(UTILS_DIR, "problemLoader.gen.ts");
  const TEMPLATES_DIR = path.join(__dirname, "templates");

  function loadTemplate(name: string, type: string): string {
    return fs.readFileSync(path.join(TEMPLATES_DIR, `${name}.${type}.template`), "utf-8");
  }

  function createProblemTemplate(day: number, part: number): string {
    const template = loadTemplate("problem", "ts");
    return template.replace("{{day}}", String(day)).replace("{{part}}", String(part));
  }

  function createLoaderContent(imports: string, problems: string): string {
    const template = loadTemplate("loader", "ts");
    return template.replace("{{imports}}", imports).replace("{{problems}}", problems);
  }

  function ensureDirExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }

  function ensureProblemFileExists(day: number, part: number) {
    const dayDir = path.join(PROBLEMS_DIR, `day${day}`);
    const filePath = path.join(dayDir, `part${part}.ts`);
    const inputPath = path.join(dayDir, "input.txt");

    ensureDirExists(dayDir);

    if (!fs.existsSync(inputPath)) {
      fs.writeFileSync(inputPath, loadTemplate("input", "txt"));
      console.log(`Created input file: ${inputPath}`);
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, createProblemTemplate(day, part));
      console.log(`Created new problem file: ${filePath}`);
    }
  }

  function generateLoader() {
    ensureDirExists(PROBLEMS_DIR);
    ensureDirExists(UTILS_DIR);

    ensureProblemFileExists(1, 1);
    ensureProblemFileExists(1, 2);

    let imports = "";
    const problemList: string[] = [];

    const dayDirs = fs
      .readdirSync(PROBLEMS_DIR)
      .filter((dir) => dir.toLowerCase().startsWith("day"));

    dayDirs.forEach((dayDir) => {
      const dayNum = parseInt(dayDir.toLowerCase().replace("day", ""));
      if (isNaN(dayNum)) return;

      const partFiles = fs
        .readdirSync(path.join(PROBLEMS_DIR, dayDir))
        .filter((file) => file.toLowerCase().startsWith("part") && file.endsWith(".ts"));

      partFiles.forEach((partFile) => {
        const partNum = parseInt(
          partFile.toLowerCase().replace("part", "").replace(".ts", ""),
        );
        if (isNaN(partNum)) return;

        const sourceCode = fs.readFileSync(
          path.join(PROBLEMS_DIR, dayDir, partFile),
          "utf-8",
        );

        const importName = `day${dayNum}part${partNum}`;
        imports += `import { solve as ${importName}, problemLink as ${importName}Link } from '../problems/${dayDir}/${partFile.replace(
          ".ts",
          "",
        )}';\n`;

        const inputContent = fs.readFileSync(
          path.join(PROBLEMS_DIR, dayDir, "input.txt"),
          "utf-8",
        );

        problemList.push(`    {
      day: ${dayNum},
      part: ${partNum},
      solve: ${importName},
      problemLink: ${importName}Link,
      code: ${JSON.stringify(sourceCode)},
      input: ${JSON.stringify(inputContent)}
    }`);
      });
    });

    const content = createLoaderContent(imports, problemList.join(",\n"));
    fs.writeFileSync(LOADER_PATH, content);
  }
  return {
    name: "problem-loader",
    configureServer(server) {
      generateLoader();

      server.watcher.add(path.resolve(PROBLEMS_DIR));
      server.watcher.on("change", (file) => {
        if (file.includes(PROBLEMS_DIR) && file.endsWith(".ts")) {
          generateLoader();
          const module = server.moduleGraph.getModuleById(path.resolve(LOADER_PATH));
          if (module) {
            server.moduleGraph.invalidateModule(module);
          }
        }
      });
    },
    buildStart() {
      generateLoader();
    },
  };
}
