const INITIAL_STATE = {
  list: [],
  searchResult: null,
  peekResult: null,
  error: null,
};

const ACTIONS = {
  ADD: "ADD",
  SEARCH: "SEARCH",
  PEEK: "PEEK",
  DELETE: "DELETE",
  CLEAR: "CLEAR",
  UPDATE_LIST: "UPDATE_LIST",
};

const linkedListReducer = (state, action) => {
  const resetOutput = { searchResult: null, peekResult: null, error: null };

  switch (action.type) {
    case ACTIONS.ADD:
      return { ...state, ...resetOutput };

    case ACTIONS.SEARCH:
      if (action.payload.error) {
        return {
          ...state,
          searchResult: null,
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
          ...resetOutput,
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
          error: "DELETE: " + action.payload.error,
        };
      }
      return { ...state, ...resetOutput };

    case ACTIONS.CLEAR:
      if (action.payload.error) {
        return {
          ...state,
          error: "CLEAR: " + action.payload.error,
        };
      }
      return { ...state, ...resetOutput };

    case ACTIONS.UPDATE_LIST:
      return { ...state, list: action.payload };

    default:
      return state;
  }
};

export { linkedListReducer, INITIAL_STATE, ACTIONS };
