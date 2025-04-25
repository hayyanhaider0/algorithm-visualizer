import { useState, useRef } from "react";

const Input = ({
  btn1Text,
  btn2Text,
  btn3Text,
  btn4Text,
  btn5Text,
  handleActions,
  ACTIONS,
  type,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();

    if (inputValue) {
      handleActions(ACTIONS.ADD, inputValue);
      setInputValue("");
    } else {
      setError(true);
    }
  };

  const handleSearch = () => {
    if (inputValue) {
      handleActions(ACTIONS.SEARCH, inputValue);
      setInputValue("");
    } else {
      setError(true);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (inputValue) {
      handleActions(ACTIONS.DELETE, inputValue);
      setInputValue("");
    } else {
      setError(true);
    }
  };

  const handlePeek = () => {
    handleActions(ACTIONS.PEEK);
    setError(false);
  };

  const handlePop = () => {
    handleActions(ACTIONS.DELETE);
    setError(false);
  };

  const handleClear = () => {
    handleActions(ACTIONS.CLEAR);
    setError(false);
  };

  const handleExtract = () => {
    handleActions(ACTIONS.EXTRACT);
    setError(false);
  };

  return (
    <section>
      <div className="bg-primary py-4 text-center">
        <h2>Input</h2>
      </div>

      {/* Input box */}
      <form onSubmit={handleAdd} className="grid grid-cols-4 gap-4 p-4">
        <input
          type={type === "tree" ? "number" : "text"}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={() => setError(false)}
          placeholder={error ? "Invalid input!" : "Enter data..."}
          className={`col-span-2 border-4 text-primary sm:col-span-3 ${error ? "border-red-600 placeholder:text-red-600" : "border-transparent"}`}
        />
        {/* Add button */}
        <button type="submit" className="col-span-2 sm:col-span-1">
          {btn1Text}
        </button>

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="col-span-2 hover:border-yellow-500 hover:text-yellow-500"
        >
          {btn2Text}
        </button>

        {/* Delete/Pop/Dequeue button */}
        <button
          type="button"
          onClick={(e) => {
            if (btn3Text === "Delete") {
              handleDelete(e);
            } else {
              handlePop();
            }
          }}
          className="col-span-2 hover:border-red-500 hover:text-red-500"
        >
          {btn3Text}
        </button>

        {/* Peek button */}
        <button type="button" onClick={handlePeek} className="col-span-2">
          {btn4Text}
        </button>

        {/* Clear button */}
        <button
          type="button"
          onClick={handleClear}
          className="col-span-2 hover:border-red-500 hover:text-red-500"
        >
          Clear
        </button>

        {/* Extract button */}
        {btn5Text && (
          <button
            type="button"
            onClick={handleExtract}
            className="col-span-full hover:border-red-500 hover:text-red-500"
          >
            Extract
          </button>
        )}
      </form>
    </section>
  );
};

export default Input;
