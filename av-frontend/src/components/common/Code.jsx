import SyntaxHighlighter from "react-syntax-highlighter";
import { useState } from "react";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({ snippets }) => {
  const [selectedSnippet, setSelectedSnippet] = useState(0);

  return (
    <section className="w-screen lg:w-auto">
      <div className="relative bg-primary py-4 text-center">
        <h2>Code</h2>
        <div className="bg-shadow absolute -top-1/4 left-0 z-10 h-10 w-full -scale-y-100 lg:hidden" />
      </div>

      {/* Tab buttons to select code snippets */}
      <div className="flex gap-2 bg-primary pt-1">
        {snippets.map((snippet, index) => (
          <button
            key={index}
            onClick={() => setSelectedSnippet(index)}
            className={`rounded-b-none border-none ${selectedSnippet === index ? "bg-zinc-950 text-secondary" : ""}`}
          >
            {snippet.language}
          </button>
        ))}
      </div>

      {/* Display the selected code snippet */}
      <SyntaxHighlighter
        language={snippets[selectedSnippet].language.toLowerCase()}
        style={monokaiSublime}
        showLineNumbers
        customStyle={{ backgroundColor: "#09090B" }}
        className="custom-scrollbar max-h-[32rem] overflow-auto"
      >
        {snippets[selectedSnippet].code}
      </SyntaxHighlighter>
    </section>
  );
};

export default Code;
