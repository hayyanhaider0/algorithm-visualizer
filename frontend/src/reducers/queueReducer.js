const INITIAL_STATE = {
  queue: [],
  searchResult: null,
  peekResult: null,
  deleteResult: null,
  error: null,
};

const ACTIONS = {
  ADD: "ADD",
  SEARCH: "SEARCH",
  PEEK: "PEEK",
  DELETE: "DELETE",
  CLEAR: "CLEAR",
  UPDATE_QUEUE: "UPDATE_QUEUE",
};

const queueReducer = (state, action) => {
  const resetOutput = {
    searchResult: null,
    peekResult: null,
    deleteResult: null,
    error: null,
  };

  switch (action.type) {
    case ACTIONS.ADD:
      return { ...state, ...resetOutput };
    case ACTIONS.SEARCH:
      if (action.payload.error) {
        return {
          ...state,
          ...resetOutput,
          error: "SEARCH: " + action.payload.error,
        };
      }
      return {
        ...state,
        searchResult: {
          value: action.payload.value,
          index: action.payload.index,
        },
      };
    case ACTIONS.PEEK:
      if (action.payload.error) {
        return {
          ...state,
          peekResult: null,
          error: "PEEK: " + action.payload.error,
        };
      }
      return {
        ...state,
        peekResult: action.payload,
      };
    case ACTIONS.DELETE:
      if (action.payload.error) {
        return {
          ...state,
          ...resetOutput,
          error: "POP: " + action.payload.error,
        };
      }
      return {
        ...state,
        ...resetOutput,
        deleteResult: action.payload.deleteResult,
        queue: action.payload.queue,
      };
    case ACTIONS.CLEAR:
      if (action.payload.error) {
        return {
          ...state,
          error: "CLEAR: " + action.payload.error,
        };
      }
      return { ...state, ...resetOutput };
    case ACTIONS.UPDATE_QUEUE:
      return { ...state, queue: action.payload };
    default:
      return state;
  }
};

export { INITIAL_STATE, ACTIONS, queueReducer };
