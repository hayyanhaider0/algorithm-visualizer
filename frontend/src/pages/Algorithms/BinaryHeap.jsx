import { useEffect, useReducer } from "react";
import BinaryHeapClass from "../../data/AlgorithmClasses/BH";
import TreeVisualizer from "../../components/common/TreeVisualizer";
import Input from "../../components/common/Input";
import Output from "../../components/common/Output";
import Description from "../../components/common/Description";
import Code from "../../components/common/Code";
import descriptions from "../../data/descriptions";
import { snippets } from "../../data/snippets";
import {
  heapReducer,
  INITIAL_STATE,
  ACTIONS,
} from "../../reducers/heapReducer";
import ListVisualizer from "../../components/common/ListVisualizer";

const HEAP_API = `${import.meta.env.VITE_API}/heap`;

const BinaryHeap = () => {
  const [state, dispatch] = useReducer(heapReducer, INITIAL_STATE);

  const fetchUpdatedHeap = async () => {
    try {
      const response = await fetch(`${HEAP_API}/tree`);
      if (!response.ok) throw new Error("Failed to fetch heap");
      const updatedHeap = await response.json();
      dispatch({ type: ACTIONS.UPDATE_TREE, payload: updatedHeap });
    } catch (error) {
      console.error("Error fetching binary heap:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedHeap();
  }, []);

  const handleActions = async (actionType, payload) => {
    let url = HEAP_API;
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
        url += `/delete/${payload}`;
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
      case ACTIONS.EXTRACT:
        url += `/extract`;
        method = "GET";
        break;
      case ACTIONS.TOGGLE:
        url += `/toggle`;
        method = "GET";
      default:
        return;
    }

    try {
      const res = await fetch(url, { method });
      const data = await res.json();

      // After performing the operation, always fetch the updated heap
      const updatedHeapRes = await fetch(`${HEAP_API}/tree`);
      const updatedHeap = await updatedHeapRes.json();

      if (res.ok) {
        dispatch({ type: actionType, payload: data });
        dispatch({ type: ACTIONS.UPDATE_TREE, payload: updatedHeap });
      }
    } catch (error) {
      console.error("Error handling binary heap operation", error);
    }
  };

  const convertToTreeNode = (node) => {
    // If the input is null or undefined, return null
    if (!node) return null;

    // Create the current node object
    return {
      value: node.data, // Use 'data' as the node's value
      id: node.id, // Optionally preserve the original ID
      depth: node.depth,
      left:
        node.children && node.children[0]
          ? convertToTreeNode(node.children[0])
          : null,
      right:
        node.children && node.children[1]
          ? convertToTreeNode(node.children[1])
          : null,
    };
  };

  const root = convertToTreeNode(state.tree);

  return (
    <div>
      <div className="flex flex-col items-center gap-8 bg-primary p-4 text-center">
        <h1>Binary Heap</h1>
        <button onClick={() => dispatch({ type: ACTIONS.TOGGLE })}>
          Toggle Heap Type ({state.isMinHeap ? "Min Heap" : "Max Heap"})
        </button>
      </div>
      <TreeVisualizer root={root} />
      <span className="flex w-full flex-col gap-8 justify-self-start">
        <div />
        <ListVisualizer type="heap" structure={state.array} />
      </span>
      <div className="grid lg:grid-cols-2">
        <Input
          btn1Text="Add"
          btn2Text="Search"
          btn3Text="Delete"
          btn4Text="Peek"
          btn5Text="Extract Root"
          handleActions={handleActions}
          ACTIONS={ACTIONS}
        />
        <Output
          heading1="Search"
          heading2="Peek"
          heading3="Extract"
          value1={state.searchResult ? state.searchResult.value : "null"}
          index1={state.searchResult ? state.searchResult.id : "null"}
          value2={state.peekResult ? state.peekResult : "null"}
          index2={state.peekResult ? "root" : "null"}
          value3={state.extractResult ? state.extractResult : "null"}
          index3={state.extractResult ? "root" : "null"}
          error={state.error}
          type="tree"
        />
        <Description description={descriptions.heap.paragraphs} />
        <Code snippets={snippets.heap} />
      </div>
    </div>
  );
};

export default BinaryHeap;
