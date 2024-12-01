import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Code({ problem }: { problem: { code: string } }) {
  return (
    <div className=" mt-4">
      <SyntaxHighlighter language="typescript" style={darcula} showLineNumbers wrapLines>
        {problem.code}
      </SyntaxHighlighter>
    </div>
  );
}
