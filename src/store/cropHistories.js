const RECEIVE_CROP_HISTORY = '/cropHistory/RECEIVE_CROP_HISTORY';
import db, {
  listenTo,
  getDataByType,
  deleteData,
  deleteDataRecursive,
  addData,
  updateData
} from '../utils/db';
import validate from '../utils/validation';
import { receiveErrors } from './ui';

const initialState = {
  cropHistories: []
};

export const addCropHistory = params => {
  return (dispatch, getState) => {
    return validate(
      {
        description: 'required,notempty',
        type: 'required,notempty'
      },
      params
    ).then(res => {
      if (Object.keys(res).length > 0) {
        dispatch(receiveErrors(res));
        return false;
      }

      return addData('cropHistory', { ...params });
    });
  };
};

export const getCropHistory = () => {
  return (dispatch, getState) => {
    getDataByType({
      elementType: 'cropHistory',
      relations: [{ name: 'parent' }]
    }).then(res => {
      dispatch(receiveCropHistory(res.docs));
    });
  };
};

export const loadCropHistories = () => {
  return (dispatch, getState) => {
    dispatch(getCropHistory());
    listenTo('elementType', 'cropHistory', dispatch, getCropHistory);
  };
};

export const updateCropHistory = (params, id) => {
  return (dispatch, getState) => {
    updateData(params, id);
  };
};

export const deleteCropHistory = id => {
  return dispatch => {
    deleteDataRecursive({ _id: id });
  };
};

export const receiveCropHistory = cropHistories => ({
  type: RECEIVE_CROP_HISTORY,
  cropHistories: cropHistories
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CROP_HISTORY:
      return { ...state, cropHistories: action.cropHistories };

    default:
      return state;
  }
}

export default reducer;
