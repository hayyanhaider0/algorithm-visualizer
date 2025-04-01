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
      const response = await fetch(`${BST_API}/tree`);
      if (!response.ok) throw new Error("Failed to fetch tree");
      const updatedTree = await response.json();
      dispatch({ type: ACTIONS.UPDATE_TREE, payload: updatedTree });
    } catch (error) {
      console.error("Error fetching binary search tree:", error);
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
      const data = await res.json();

      // After performing the operation, always fetch the updated tree
      const updatedTreeRes = await fetch(`${BST_API}/tree`);
      const updatedTree = await updatedTreeRes.json();

      console.log(data);

      if (res.ok) {
        dispatch({ type: actionType, payload: data });
        dispatch({ type: ACTIONS.UPDATE_TREE, payload: updatedTree });
      }
    } catch (error) {
      console.error("Error handling binary search tree operation", error);
    }
  };

  const convertToTreeNode = (node) => {
    // If the input is null or undefined, return null
    if (!node) return null;

    // Create the current node object
    return {
      value: node.value, // Use 'data' as the node's value
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
      <div className="bg-primary p-4 text-center">
        <h1>Binary Search Tree</h1>
      </div>
      <TreeVisualizer root={root} />
      <div className="grid lg:grid-cols-2">
        <Input
          btn1Text="Add"
          btn2Text="Search"
          btn3Text="Delete"
          btn4Text="Peek"
          handleActions={handleActions}
          ACTIONS={ACTIONS}
          type="tree"
        />
        <Output
          heading1="Search"
          heading2="Peek"
          value1={state.searchResult ? state.searchResult.value : "null"}
          index1={state.searchResult ? state.searchResult.depth : "null"}
          value2={state.peekResult ? state.peekResult : "null"}
          index2={state.peekResult ? "root" : "null"}
          error={state.error}
          type="tree"
        />
        <Description description={descriptions.bst.paragraphs} />
        <Code snippets={snippets.bst} />
      </div>
    </div>
  );
};

export default BinarySearchTree;
