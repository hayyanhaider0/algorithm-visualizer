import ListVisualizer from "../../components/common/ListVisualizer";
import Description from "../../components/common/Description";
import Code from "../../components/common/Code";
import Input from "../../components/common/Input";
import Output from "../../components/common/Output";
import { snippets } from "../../data/snippets";
import descriptions from "../../data/descriptions";
import { useEffect, useReducer } from "react";
import {
  INITIAL_STATE,
  ACTIONS,
  stackReducer,
} from "../../reducers/stackReducer";

const STACK_API = `${import.meta.env.VITE_API}/stack`;

const Stack = () => {
  const [state, dispatch] = useReducer(stackReducer, INITIAL_STATE);

  const fetchUpdatedStack = async () => {
    try {
      const response = await fetch(`${STACK_API}/stack`);
      if (!response.ok) throw new Error("Failed to fetch stack");
      const updatedList = await response.json();
      dispatch({ type: ACTIONS.UPDATE_STACK, payload: updatedStack });
    } catch (error) {
      console.error("Error fetching stack:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedStack();
  }, []);

  const handleActions = async (actionType, payload) => {
    let url = STACK_API;
    let method;

    switch (actionType) {
      case ACTIONS.ADD:
        url += `/insert?value=${payload}`;
        method = "POST";
        break;
      case ACTIONS.SEARCH:
        url += `/search?value=${payload}`;
        method = "GET";
        break;
      case ACTIONS.DELETE:
        url += `/delete`;
        method = "DELETE";
        break;
      case ACTIONS.PEEK:
        url += `/peek`;
        method = "GET";
        break;
      case ACTIONS.CLEAR:
        url += `/clear`;
        method = "DELETE";
        break;
      default:
        return;
    }

    try {
      const res = await fetch(url, { method });

      if (!res) {
        const errorMessage = res.clone().text();
        console.error("Error: ", await errorMessage);
        return;
      }

      const data = await res.json();

      const updatedStackRes = await fetch(`${STACK_API}/stack`);
      const updatedStack = await updatedStackRes.json();

      if (res.ok) {
        dispatch({ type: actionType, payload: data });
        dispatch({ type: ACTIONS.UPDATE_STACK, payload: updatedStack });
      }
    } catch (error) {
      console.error("Error handling stack operation", error);
    }
  };

  return (
    <div>
      <div className="bg-primary p-4 text-center">
        <h1>Stack</h1>
      </div>
      <ListVisualizer type="stack" structure={state.stack} />
      <div className="grid lg:grid-cols-2">
        <Input
          btn1Text="Push"
          btn2Text="Search"
          btn3Text="Pop"
          btn4Text="Peek"
          handleActions={handleActions}
          ACTIONS={ACTIONS}
        />
        <Output
          heading1="Search"
          heading2="Peek"
          heading3="Pop"
          value1={state.searchResult ? state.searchResult.value : "null"}
          index1={state.searchResult ? state.searchResult.index : "null"}
          value2={state.peekResult ? state.peekResult : "null"}
          index2={state.peekResult ? state.stack.length - 1 : "null"}
          value3={state.deleteResult ? state.deleteResult : "null"}
          index3={state.deleteResult ? state.stack.length : "null"}
          error={state.error}
        />
        <Description description={descriptions.stack.paragraphs} />
        <Code snippets={snippets.stack} />
      </div>
    </div>
  );
};

export default Stack;
