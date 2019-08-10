const RECEIVE_BOVINE_TYPES = "/testPouch/RECEIVE_BOVINE_TYPES";
import db, {
  addData,
  listenTo,
  getDataByType,
  deleteData,
  deleteDataRecursive
} from "../utils/db";

const initialState = {
  bovineTypes: []
};

export const addBovineType = params => {
  return (dispatch, getState) => {
    addData("bovineType", params);
  };
};

export const getBovineTypes = () => {
  return (dispatch, getState) => {
    getDataByType({ elementType: "bovineType", relations: [{ name: "article" }] }).then(
      res => {
        dispatch(receiveBovineTypes(res.docs));
      }
    );
  };
};

export const deleteBovineType = id => {
  return (dispatch, getState) => {
    deleteDataRecursive({ _id: id }).then(res => console.log(res));
  };
};

export const loadBovineTypes = () => {
  return (dispatch, getState) => {
    dispatch(getBovineTypes());
    listenTo("elementType", "bovineType", dispatch, getBovineTypes);
  };
};

export const receiveBovineTypes = bovineTypes => ({
  type: RECEIVE_BOVINE_TYPES,
  bovineTypes: bovineTypes
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BOVINE_TYPES:
      return { ...state, bovineTypes: action.bovineTypes };

    default:
      return state;
  }
}

export default reducer;
