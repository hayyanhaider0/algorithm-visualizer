import { useReducer } from "react";
import BinaryHeapClass from "../../data/AlgorithmClasses/BH";
import TreeVisualizer from "../../components/common/TreeVisualizer";
import Input from "../../components/common/Input";
import Output from "../../components/common/Output";
import Description from "../../components/common/Description";
import Code from "../../components/common/Code";
import descriptions from "../../data/descriptions";
import { snippets } from "../../data/snippets";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { AnimatePresence, motion } from "framer-motion";

const INITIAL_STATE = {
  heap: new BinaryHeapClass(false),
  tree: null,
  searchResult: null,
  peekResult: null,
  deleteResult: null,
  isMinHeap: false,
  showModal: false,
};

const ACTIONS = {
  ADD: "ADD",
  SEARCH: "SEARCH",
  PEEK: "PEEK",
  DELETE: "DELETE",
  CLEAR: "CLEAR",
  TOGGLE_HEAP_TYPE: "TOGGLE_HEAP_TYPE",
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
};

const reducer = (state, action) => {
  const resetOutput = {
    searchResult: null,
    peekResult: null,
    deleteResult: null,
  };

  switch (action.type) {
    case ACTIONS.ADD: {
      state.heap.insert(Number(action.payload));
      const tree = state.heap.toTree();
      return { ...state, tree, resetOutput };
    }

    case ACTIONS.SEARCH: {
      const searchResult = state.heap.search(Number(action.payload));
      return { ...state, searchResult };
    }

    case ACTIONS.PEEK: {
      const peekResult = state.heap.getRoot();
      return { ...state, peekResult };
    }

    case ACTIONS.DELETE: {
      const deleteResult = state.heap.extractRoot();
      const tree = state.heap.toTree();
      return {
        ...state,
        tree,
        deleteResult,
        searchResult: null,
        peekResult: null,
      };
    }

    case ACTIONS.CLEAR: {
      const heap = new BinaryHeapClass(state.isMinHeap);
      return {
        ...state,
        heap,
        tree: null,
        resetOutput,
      };
    }

    case ACTIONS.TOGGLE_HEAP_TYPE: {
      const isMinHeap = !state.isMinHeap;
      const heap = new BinaryHeapClass(isMinHeap);
      return { ...state, heap, isMinHeap, tree: null, showModal: false };
    }

    case ACTIONS.SHOW_MODAL: {
      return { ...state, showModal: true };
    }

    case ACTIONS.HIDE_MODAL: {
      return { ...state, showModal: false };
    }
    default:
      return state;
  }
};

const BinaryHeap = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <div className="flex flex-col items-center gap-8 bg-primary p-4 text-center">
        <h1>Binary Heap</h1>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.SHOW_MODAL });
          }}
          className="w-fit"
        >
          {state.isMinHeap
            ? "Minimum Heap (Click to Toggle)"
            : "Maximum Heap (Click to Toggle)"}
        </button>
        {state.showModal && (
          <ConfirmationModal
            message="Are you sure you want to toggle the heap type? Your current heap will be reset."
            onConfirm={() => dispatch({ type: ACTIONS.TOGGLE_HEAP_TYPE })}
            onCancel={() => dispatch({ type: ACTIONS.HIDE_MODAL })}
          />
        )}
      </div>
      <TreeVisualizer root={state.tree} />
      <div className="grid lg:grid-cols-2">
        <Input
          dispatch={dispatch}
          btn1Text="Add"
          btn2Text="Search"
          btn3Text="Delete"
          btn4Text="Peek"
        />
        <Output
          heading1="Search"
          heading2="Get"
          heading3="Extract"
          value1={state.searchResult ? state.searchResult.value : "null"}
          index1={state.searchResult ? state.searchResult.id : "null"}
          value2={state.peekResult ? state.peekResult.value : "null"}
          index2={state.peekResult ? "root" : "null"}
          value3={state.deleteResult ? state.deleteResult.value : "null"}
          index3={state.deleteResult ? "root" : "null"}
        />
        <Description description={descriptions.heap.paragraphs} />
        <Code snippets={snippets.heap} />
      </div>
    </div>
  );
};

export default BinaryHeap;
