const RECEIVE_BOVINE = '/bovine/RECEIVE_BOVINE';
import db, {
  listenTo,
  getDataByType,
  deleteData,
  deleteDataRecursive,
  addData
} from '../utils/db';
import validate from '../utils/validation';
import { receiveErrors } from './ui';

const initialState = {
  bovines: []
};

export const addBovine = params => {
  return (dispatch, getState) => {
    const validation = validate(
      {
        caravane: 'unique|bovine,notempty',
        internCaravane: 'unique|bovine,notempty',
        name: 'unique|bovine,notempty',
        batch: 'exists|batch,notempty',
        type: 'exists|bovineType,notempty',
        parent: 'exists|bovine'
      },
      params
    ).then(res => {
      if (Object.keys(res).length > 0) {
        dispatch(receiveErrors(res));
        return;
      }
      addData('bovine', params);
    });
  };
};

export const getBovine = (page, perPage) => {
  return (dispatch, getState) => {
    getDataByType({
      elementType: 'bovine',
      relations: [{ name: 'batch' }, { name: 'parent' }, { name: 'type' }],
      page: page,
      perPage: perPage
    }).then(res => {
      dispatch(receiveBovine(res.docs));
    });
  };
};

export const loadBovines = () => {
  return (dispatch, getState) => {
    dispatch(getBovine());
    listenTo('elementType', 'bovine', dispatch, getBovine);
  };
};

export const deleteBovine = id => {
  return dispatch => {
    deleteDataRecursive({ _id: id });
  };
};

export const receiveBovine = bovines => ({
  type: RECEIVE_BOVINE,
  bovines: bovines
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BOVINE:
      return { ...state, bovines: action.bovines };

    default:
      return state;
  }
}

export default reducer;
