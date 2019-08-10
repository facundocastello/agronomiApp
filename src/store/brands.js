const RECEIVE_BRANDS = "/testPouch/RECEIVE_BRANDS";
import db, {
  addData,
  listenTo,
  getDataByType,
  deleteData,
  deleteDataRecursive
} from "./db";

const initialState = {
  brands: []
};

export const addBrand = params => {
  return (dispatch, getState) => {
    addData("brand", params);
  };
};

export const getBrands = () => {
  return (dispatch, getState) => {
    getDataByType({ type: "brand", relations: [{ name: "article" }] }).then(
      res => {
        dispatch(receiveBrands(res.docs));
      }
    );
  };
};

export const deleteBrand = id => {
  return (dispatch, getState) => {
    deleteDataRecursive({ _id: id }).then(res => console.log(res));
  };
};

export const loadBrands = () => {
  return (dispatch, getState) => {
    dispatch(getBrands());
    listenTo("type", "brand", dispatch, getBrands);
  };
};

export const receiveBrands = brands => ({
  type: RECEIVE_BRANDS,
  brands: brands
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BRANDS:
      return { ...state, brands: action.brands };

    default:
      return state;
  }
}

export default reducer;
