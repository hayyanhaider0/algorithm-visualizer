const Output = ({
  heading1,
  heading2,
  heading3,
  value1,
  index1,
  value2,
  index2,
  value3,
  index3,
  error,
  type,
}) => {
  const index = type === "tree" ? "Depth" : "Index";

  return (
    <section className="flex flex-col bg-zinc-950">
      <div className="bg-primary py-4 text-center">
        <h2>Output</h2>
      </div>
      <div
        className={`relative my-auto grid w-full ${heading3 ? "sm:grid-cols-3" : `mi:grid-cols-2 ${error && "mi:grid-cols-3"}`} items-center justify-center gap-4 p-8 text-center text-secondary`}
      >
        {/* Search Result */}
        <div>
          <h4>{heading1} Result</h4>
          <p>Value: {value1}</p>
          <p>
            {index}: {index1}
          </p>
        </div>

        {/* Peek Result */}
        <div>
          <h4>{heading2} Result</h4>
          <p>Value: {value2}</p>
          <p>
            {index}: {index2}
          </p>
        </div>

        {/* Pop/Dequeue/ExtractRoot Result */}
        {heading3 && (
          <div>
            <h4>{heading3} Result</h4>
            <p>Value: {value3}</p>
            <p>
              {index}: {index3}
            </p>
          </div>
        )}

        {error && (
          <div className={`text-red-600 ${heading3 && "sm:col-start-2"}`}>
            <h4>Error</h4>
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Output;
