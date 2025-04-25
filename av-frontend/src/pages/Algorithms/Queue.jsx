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
  queueReducer,
} from "../../reducers/queueReducer";

const QUEUE_API = `${import.meta.env.VITE_API}/queue`;

const Queue = () => {
  const [state, dispatch] = useReducer(queueReducer, INITIAL_STATE);

  const fetchUpdatedQueue = async () => {
    try {
      const response = await fetch(`${QUEUE_API}/queue`);
      if (!response.ok) throw new Error("Failed to fetch queue");
      const updatedList = await response.json();
      dispatch({ type: ACTIONS.UPDATE_QUEUE, payload: updatedQueue });
    } catch (error) {
      console.error("Error fetching queue:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedQueue();
  }, []);

  const handleActions = async (actionType, payload) => {
    let url = QUEUE_API;
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

      const updatedQueueRes = await fetch(`${QUEUE_API}/queue`);
      const updatedQueue = await updatedQueueRes.json();

      if (res.ok) {
        dispatch({ type: actionType, payload: data });
        dispatch({ type: ACTIONS.UPDATE_QUEUE, payload: updatedQueue });
      }
    } catch (error) {
      console.error("Error handling queue operation", error);
    }
  };

  return (
    <div>
      <div className="bg-primary p-4 text-center">
        <h1>Queue</h1>
      </div>
      <ListVisualizer type="queue" structure={state.queue} />
      <div className="grid lg:grid-cols-2">
        <Input
          btn1Text="Enqueue"
          btn2Text="Search"
          btn3Text="Dequeue"
          btn4Text="Peek"
          handleActions={handleActions}
          ACTIONS={ACTIONS}
        />
        <Output
          heading1="Search"
          heading2="Peek"
          heading3="Dequeue"
          value1={state.searchResult ? state.searchResult.value : "null"}
          index1={state.searchResult ? state.searchResult.index : "null"}
          value2={state.peekResult ? state.peekResult : "null"}
          index2={state.peekResult ? state.queue.length - 1 : "null"}
          value3={state.deleteResult ? state.deleteResult : "null"}
          index3={state.deleteResult ? state.queue.length - 1 : "null"}
          error={state.error}
        />
        <Description description={descriptions.queue.paragraphs} />
        <Code snippets={snippets.queue} />
      </div>
    </div>
  );
};

export default Queue;
