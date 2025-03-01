import ListVisualizer from "../../components/common/ListVisualizer";
import Description from "../../components/common/Description";
import Code from "../../components/common/Code";
import Input from "../../components/common/Input";
import Output from "../../components/common/Output";
import { snippets } from "../../data/snippets";
import descriptions from "../../data/descriptions";
import { useEffect, useReducer } from "react";
import {
  linkedListReducer,
  INITIAL_STATE,
  ACTIONS,
} from "../../reducers/linkedListReducer";

const LINKED_LIST_API = `${import.meta.env.VITE_API}/linked-list`;

const LinkedList = () => {
  const [state, dispatch] = useReducer(linkedListReducer, INITIAL_STATE);

  const fetchUpdatedList = async () => {
    try {
      const response = await fetch(`${LINKED_LIST_API}/list`);
      if (!response.ok) throw new Error("Failed to fetch list");
      const updatedList = await response.json();
      dispatch({ type: ACTIONS.UPDATE_LIST, payload: updatedList });
    } catch (error) {
      console.error("Error fetching linked list:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedList();
  }, []);

  const handleActions = async (actionType, payload) => {
    let url = LINKED_LIST_API;
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
      default:
        return;
    }

    try {
      const res = await fetch(url, { method });

      if (!res.ok) {
        const errorMessage = await res.clone().text();
        console.error("Error", errorMessage);
        return;
      }

      const data = await res.json();

      // After performing the operation, always fetch the updated list
      const updatedListRes = await fetch(`${LINKED_LIST_API}/list`);
      const updatedList = await updatedListRes.json();

      if (res.ok) {
        dispatch({ type: actionType, payload: data });
        dispatch({ type: ACTIONS.UPDATE_LIST, payload: updatedList });
      }
    } catch (error) {
      console.error("Error handling linked list operation", error);
    }
  };

  return (
    <div>
      <div className="bg-primary p-4 text-center">
        <h1>Linked List</h1>
      </div>
      <ListVisualizer type="linkedList" structure={state.list} />
      <div className="grid lg:grid-cols-2">
        <Input
          btn1Text="Add"
          btn2Text="Search"
          btn3Text="Delete"
          btn4Text="Peek"
          handleActions={handleActions}
          ACTIONS={ACTIONS}
        />
        <Output
          heading1="Search"
          heading2="Peek"
          value1={state.searchResult ? state.searchResult.value : "null"}
          index1={state.searchResult ? state.searchResult.index : "null"}
          value2={state.peekResult ? state.peekResult.value : "null"}
          index2={state.peekResult ? "0" : "null"}
          error={state.error}
        />
        <Description description={descriptions.linkedList.paragraphs} />
        <Code snippets={snippets.linkedList} />
      </div>
    </div>
  );
};

export default LinkedList;
