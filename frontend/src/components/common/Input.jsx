import { useState, useRef } from "react";

const Input = ({ dispatch, btn1Text, btn2Text, btn3Text, btn4Text }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue) {
      setInputValue("");
      dispatch({ type: "ADD", payload: inputValue });
    }
  };

  const handleSearch = () => {
    if (inputValue) {
      dispatch({ type: "SEARCH", payload: inputValue });
      setInputValue("");
    }
  };

  const handlePeek = () => {
    dispatch({ type: "PEEK" });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (inputValue) {
      setInputValue("");
      dispatch({ type: "DELETE", payload: inputValue });
    }
  };

  const handlePop = () => {
    dispatch({ type: "DELETE" });
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <section>
      <div className="bg-primary py-4 text-center">
        <h2>Input</h2>
      </div>

      {/* Input box */}
      <form onSubmit={handleAdd} className="grid grid-cols-4 gap-4 p-4">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter data..."
          className="col-span-3 text-primary"
        />
        {/* Add button */}
        <button type="submit">{btn1Text}</button>

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
            if (inputValue) {
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
      </form>
    </section>
  );
};

export default Input;
