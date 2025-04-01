const INITIAL_STATE = {
  tree: null,
  array: [],
  isMinHeap: true,
  searchResult: null,
  peekResult: null,
  extractResult: null,
  error: null,
};

const ACTIONS = {
  ADD: "ADD",
  SEARCH: "SEARCH",
  PEEK: "PEEK",
  DELETE: "DELETE",
  CLEAR: "CLEAR",
  EXTRACT: "EXTRACT",
  TOGGLE: "TOGGLE",
  UPDATE_TREE: "UPDATE_TREE",
};

const heapReducer = (state, action) => {
  const resetOutput = { searchResult: null, peekResult: null, error: null };

  switch (action.type) {
    case ACTIONS.ADD:
      if (action.payload.error) {
        return {
          ...state,
          error: "ADD: " + action.payload.error,
        };
      }
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
          depth: action.payload.index,
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
        peekResult: action.payload.result,
      };
    case ACTIONS.DELETE:
      if (action.payload.error) {
        return {
          ...state,
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
    case ACTIONS.EXTRACT:
      if (action.payload.error) {
        return {
          ...state,
          error: "EXTRACT: " + action.payload.error,
        };
      }
      return { ...state, extractResult: action.payload.result };
    case ACTIONS.TOGGLE:
      return { ...state, isMinHeap: !state.isMinHeap, ...resetOutput };
    case ACTIONS.UPDATE_TREE:
      if (action.payload.root === "empty") {
        return {
          ...state,
          tree: null,
          array: [],
        };
      }
      return {
        ...state,
        tree: action.payload.root,
        array: action.payload.array,
      };
    default:
      return state;
  }
};

export { INITIAL_STATE, ACTIONS, heapReducer };
