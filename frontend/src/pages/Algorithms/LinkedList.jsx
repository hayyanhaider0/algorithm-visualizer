import ListVisualizer from "../../components/common/ListVisualizer";
import Description from "../../components/common/Description";
import Code from "../../components/common/Code";
import Input from "../../components/common/Input";
import Output from "../../components/common/Output";
import { snippets } from "../../data/snippets";
import descriptions from "../../data/descriptions";
import { useReducer } from "react";

const INITIAL_STATE = {
  list: [],
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
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: state.uniqueId,
            value: action.payload,
            next: state.uniqueId + 1,
          },
        ],
        uniqueId: state.uniqueId + 1,
        ...resetOutput,
      };
    case ACTIONS.SEARCH:
      const searchIndex = state.list.findIndex(
        (node) => node.value === action.payload,
      );
      return {
        ...state,
        searchResult:
          searchIndex === -1
            ? { value: "Not found...", searchIndex }
            : { value: state.list[searchIndex].value, searchIndex },
      };
    case ACTIONS.PEEK:
      const firstNode = state.list[0];
      return {
        ...state,
        peekResult: firstNode ? firstNode.value : null,
      };
    case ACTIONS.DELETE:
      const deleteNode = state.list.find(
        (node) => node.value === action.payload,
      );

      if (!deleteNode) {
        return state;
      }

      return {
        ...state,
        list: state.list.filter((node) => node.id !== deleteNode.id),
        ...resetOutput,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        list: [],
        ...resetOutput,
      };
    default:
      return state;
  }
};

const LinkedList = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <div className="bg-primary p-4 text-center">
        <h1>Linked List</h1>
      </div>
      <ListVisualizer type="linkedList" structure={state.list} />
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
          index2={state.peekResult ? "0" : "null"}
        />
        <Description description={descriptions.linkedList.paragraphs} />
        <Code snippets={snippets.linkedList} />
      </div>
    </div>
  );
};

export default LinkedList;
