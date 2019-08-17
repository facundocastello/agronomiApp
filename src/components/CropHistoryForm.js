import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomForm from './CustomForm';

import { addCropHistory } from '../store/cropHistories';
import { updateCrop } from '../store/crops';
import { ADD_CROP_HISTORY_FORM_ITEMS } from '../utils/constants';

class CropHistoryForm extends Component {
  handleAddCropHistory = params => {
    const { addCropHistory, cropHistories, cropID, updateCrop } = this.props;
    addCropHistory(params).then(res => {
      if (!res) return;
      const newCropHistories = cropHistories
        ? cropHistories.map(histories => histories._id)
        : [];
      newCropHistories.push(res.id);
      updateCrop({ histories: newCropHistories }, cropID);
    });
  };
  render() {
    return (
      <div>
        <CustomForm
          actionSubmit={this.handleAddCropHistory}
          inputsClass='justify-content-center mt-1'
          formName='add-crop-history'
          formButton='Add History'
          formItems={ADD_CROP_HISTORY_FORM_ITEMS}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { addCropHistory, updateCrop };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CropHistoryForm);
