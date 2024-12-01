import { useState } from "react";
import { loadProblems } from "../utils/problemLoader.gen";
import Code from "./code";

export default function Problems() {
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});
  const [output, setOutput] = useState<Record<string, string>>({});

  const problems = loadProblems();

  const openInputInNewTab = (input: string) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`<pre>${input}</pre>`);
      newWindow.document.close();
    }
  };
  return (
    <div className="space-y-4">
      {problems.map((problem) => {
        const problemId = `day${problem.day}-part${problem.part}`;
        return (
          <div key={problemId} className="rounded-lg p-4 bg-base-200 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl text-base-content font-semibold mb-2">
                  Day {problem.day} - Part {problem.part}
                </h2>
                <div className="flex gap-4">
                  <a
                    href={problem.problemLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost text-primary"
                  >
                    View Problem
                  </a>
                  <button
                    onClick={() => openInputInNewTab(problem.input)}
                    className="btn btn-ghost text-primary"
                  >
                    View Input
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setShowCode((prev) => ({
                      ...prev,
                      [problemId]: !prev[problemId],
                    }))
                  }
                  className="px-3 py-1 btn btn-primary text-primary-content"
                >
                  {showCode[problemId] ? "Hide Code" : "Show Code"}
                </button>
                <button
                  onClick={() => {
                    const result = problem.solve();
                    setOutput((prev) => ({
                      ...prev,
                      [problemId]: String(result),
                    }));
                  }}
                  className="px-3 py-1 btn btn-secondary text-secondary-content"
                >
                  Solve
                </button>
              </div>
            </div>

            {showCode[problemId] && <Code problem={problem} />}

            {output[problemId] && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Output:</h3>
                <pre className=" p-4 rounded overflow-x-auto">{output[problemId]}</pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
