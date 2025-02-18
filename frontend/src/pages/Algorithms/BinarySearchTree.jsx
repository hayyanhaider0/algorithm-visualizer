import { useReducer } from "react";
import TreeVisualizer from "../../components/common/TreeVisualizer";
import Input from "../../components/common/Input";
import Output from "../../components/common/Output";
import Description from "../../components/common/Description";
import Code from "../../components/common/Code";
import descriptions from "../../data/descriptions";
import { snippets } from "../../data/snippets";
import bst from "../../data/AlgorithmClasses/BST";

const INITIAL_STATE = {
  tree: null,
  searchResult: null,
  peekResult: null,
  uniqueId: 1,
};

const ACTIONS = {
  ADD: "ADD",
  SEARCH: "SEARCH",
  PEEK: "PEEK",
  DELETE: "DELETE",
  CLEAR: "CLEAR",
};

const reducer = (state, action) => {
  const resetOutput = { searchResult: null, peekResult: null };

  switch (action.type) {
    case ACTIONS.ADD:
      let addTree = state.tree;

      if (state.tree === null) {
        addTree = new bst();
      }

      addTree.insert(Number(action.payload));

      return {
        ...state,
        tree: addTree,
      };
    case ACTIONS.SEARCH:
      const searchResult = state.tree
        ? state.tree.search(Number(action.payload))
        : null;

      return {
        ...state,
        searchResult: searchResult
          ? { value: searchResult.value, searchIndex: searchResult.id }
          : { value: "Not found..." },
      };
    case ACTIONS.PEEK:
      let root = null;

      if (state.tree !== null && state.tree.root !== null) {
        root = state.tree.root;
      }

      return {
        ...state,
        peekResult: root ? root.value : null,
      };
    case ACTIONS.DELETE:
      let delTree = state.tree;

      delTree.delete(Number(action.payload));

      return {
        ...state,
        tree: delTree,
        ...resetOutput,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        tree: null,
        ...resetOutput,
      };
    default:
      return state;
  }
};

const BinarySearchTree = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <div className="bg-primary p-4 text-center">
        <h1>Binary Search Tree</h1>
      </div>
      <TreeVisualizer root={state.tree === null ? null : state.tree.root} />
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
          heading2="Peek"
          value1={state.searchResult ? state.searchResult.value : "null"}
          index1={state.searchResult ? state.searchResult.searchIndex : "null"}
          value2={state.peekResult ? state.peekResult : "null"}
          index2={state.peekResult ? "root" : "null"}
        />
        <Description description={descriptions.bst.paragraphs} />
        <Code snippets={snippets.bst} />
      </div>
    </div>
  );
};

export default BinarySearchTree;
