const RECEIVE_BATCH = '/batch/RECEIVE_BATCH';
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
  batches: []
};

export const addBatch = params => {
  return (dispatch, getState) => {
    const validation = validate(
      {
        name: 'unique|batch,notempty',
        color: 'unique|batch,notempty'
      },
      params
    ).then(res => {
      if (Object.keys(res).length > 0) {
        dispatch(receiveErrors(res));
        return;
      }
      addData('batch', params);
    });
  };
};

export const getBatch = (page, perPage) => {
  return (dispatch, getState) => {
    getDataByType({
      elementType: 'batch',
      relations: [{ name: 'parent' }, { name: 'type' }],
      page: page,
      perPage: perPage
    }).then(res => {
      dispatch(receiveBatch(res.docs));
    });
  };
};

export const loadBatches = () => {
  return (dispatch, getState) => {
    dispatch(getBatch());
    listenTo('elementType', 'batch', dispatch, getBatch);
  };
};

export const deleteBatch = id => {
  return dispatch => {
    deleteDataRecursive({ _id: id });
  };
};

export const receiveBatch = batches => ({
  type: RECEIVE_BATCH,
  batches: batches
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BATCH:
      return { ...state, batches: action.batches };

    default:
      return state;
  }
}

export default reducer;
