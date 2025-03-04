import { useEffect, useReducer } from "react";
import TreeVisualizer from "../../components/common/TreeVisualizer";
import Input from "../../components/common/Input";
import Output from "../../components/common/Output";
import Description from "../../components/common/Description";
import Code from "../../components/common/Code";
import descriptions from "../../data/descriptions";
import { snippets } from "../../data/snippets";
import { INITIAL_STATE, ACTIONS, bstReducer } from "../../reducers/bstReducer";

const BST_API = `${import.meta.env.VITE_API}/bst`;

const BinarySearchTree = () => {
  const [state, dispatch] = useReducer(bstReducer, INITIAL_STATE);

  const fetchupdatedTree = async () => {
    try {
      const response = await fetch(`${BST_API}/list`);
      if (!response.ok) throw new Error("Failed to fetch list");
      const updatedTree = await response.json();
      dispatch({ type: ACTIONS.UPDATE_TREE, payload: updatedTree });
    } catch (error) {
      console.error("Error fetching linked list:", error);
    }
  };

  useEffect(() => {
    fetchupdatedTree();
  }, []);

  const handleActions = async (actionType, payload) => {
    let url = BST_API;
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
      console.log(data);

      // After performing the operation, always fetch the updated list
      const updatedTreeRes = await fetch(`${BST_API}/list`);
      const updatedTree = await updatedTreeRes.json();
      console.log(updatedTree);

      if (res.ok) {
        dispatch({ type: actionType, payload: data });
        dispatch({ type: ACTIONS.UPDATE_TREE, payload: updatedTree });
      }
    } catch (error) {
      console.error("Error handling linked list operation", error);
    }
  };

  return (
    <div>
      <div className="bg-primary p-4 text-center">
        <h1>Binary Search Tree</h1>
      </div>
      <TreeVisualizer root={state.tree === null ? null : state.tree.root} />
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
          index1={state.searchResult ? state.searchResult.searchIndex : "null"}
          value2={state.peekResult ? state.peekResult : "null"}
          index2={state.peekResult ? "root" : "null"}
          error={state.error}
        />
        <Description description={descriptions.bst.paragraphs} />
        <Code snippets={snippets.bst} />
      </div>
    </div>
  );
};

export default BinarySearchTree;
