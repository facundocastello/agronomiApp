const RECEIVE_CROP = '/crop/RECEIVE_CROP';
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
  crops: []
};

export const addCrop = params => {
  return (dispatch, getState) => {
    const validation = validate(
      {
        name: 'required,notempty'
      },
      params
    ).then(res => {
      if (Object.keys(res).length > 0) {
        dispatch(receiveErrors(res));
        return;
      }
      addData('crop', { ...params, size: '0', locations: [] });
    });
  };
};

export const getCrop = () => {
  return (dispatch, getState) => {
    getDataByType({
      elementType: 'crop',
      relations: [{ name: 'histories' }]
    }).then(res => {
      dispatch(receiveCrop(res.docs));
    });
  };
};

export const loadCrops = () => {
  return (dispatch, getState) => {
    dispatch(getCrop());
    listenTo('elementType', 'crop', dispatch, getCrop);
  };
};

export const updateCrop = (params, id) => {
  return (dispatch, getState) => {
    updateData(params, id);
  };
};

export const deleteCrop = id => {
  return dispatch => {
    deleteDataRecursive({ _id: id });
  };
};

export const receiveCrop = crops => ({
  type: RECEIVE_CROP,
  crops: crops
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CROP:
      return { ...state, crops: action.crops };

    default:
      return state;
  }
}

export default reducer;
