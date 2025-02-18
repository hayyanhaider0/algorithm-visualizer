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
}) => {
  return (
    <section className="flex flex-col bg-zinc-950">
      <div className="bg-primary py-4 text-center">
        <h2>Output</h2>
      </div>
      <div
        className={`relative my-auto grid w-full ${heading3 ? "grid-cols-3" : "grid-cols-2"} justify-between py-4 text-center text-secondary`}
      >
        {/* Search Result */}
        <div>
          <h4>{heading1} Result</h4>
          <p>Value: {value1}</p>
          <p>Index: {index1}</p>
        </div>

        {/* Peek Result */}
        <div>
          <h4>{heading2} Result</h4>
          <p>Value: {value2}</p>
          <p>Index: {index2}</p>
        </div>

        {/* Pop/Dequeue/ExtractRoot Result */}
        {heading3 && (
          <div>
            <h4>{heading3} Result</h4>
            <p>Value: {value3}</p>
            <p>Index: {index3}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Output;
