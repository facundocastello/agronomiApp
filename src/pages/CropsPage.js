import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Button from '../components/Button';
import CustomForm from '../components/CustomForm';
import CustomMap from '../components/CustomMap';
import CropCard from '../components/CropCard';
import CropHistoryForm from '../components/CropHistoryForm';
import Pagination from '../components/Pagination';

import {
  addCrop,
  deleteCrop,
  getCrop,
  loadCrops,
  updateCrop
} from '../store/crops';
import { ADD_CROP_FORM_ITEMS } from '../utils/constants';

class CropsPage extends Component {
  state = {
    displayMap: false,
    displayIndex: -1,
    areas: []
  };

  componentDidMount() {
    this.props.loadCrops();
  }

  deleteLocations = () => this.state.areas.map(area => area.setMap(null));

  getLocationData = () => {
    var size = 0;

    const locations = this.state.areas.map(area => {
      size += google.maps.geometry.spherical.computeArea(area.getPath());
      return area
        .getPaths()
        .getArray()[0]
        .j.map(path => ({ lat: path.lat(), lng: path.lng() }));
    });
    size = (size / 10000).toFixed(2) + 'he';
    return { size, locations };
  };

  handleCloseMap = () => {
    this.deleteLocations();
    this.setState({
      displayIndex: -1,
      displayMap: false
    });
  };

  handleSubmitUpdate = addCropParams => {
    const { _id, ...cropData } = addCropParams;
    const locationData = this.getLocationData();
    this.props.updateCrop({ ...locationData }, _id);
    this.handleCloseMap();
  };

  handleCropClick = index => {
    this.setState({
      displayMap: true,
      displayIndex: index
    });
  };

  renderCrops = () => {
    const { crops } = this.props;
    const { displayIndex } = this.state;
    return displayIndex !== -1 ? (
      <div className='col-12'>
        <CropCard
          displayHistories
          name={crops[displayIndex].name}
          size={crops[displayIndex].size}
          histories={crops[displayIndex].histories}
        />
        <CropHistoryForm
          cropID={crops[displayIndex]._id}
          cropHistories={crops[displayIndex].histories}
        />
        <div className='d-flex my-2 justify-content-center'>
          <Button
            className='bg-success mr-2'
            clickedButton={() => this.handleSubmitUpdate(crops[displayIndex])}
          >
            Save
          </Button>
          <Button
            className='bg-danger'
            clickedButton={() => this.handleCloseMap(crops[displayIndex])}
          >
            Cancel
          </Button>
        </div>
      </div>
    ) : (
      crops &&
        crops.map((crop, index) => (
          <div
            className=' col-12 col-md-6 col-lg-3 mb-4'
            key={`user-${index}`}
            onClick={() => this.handleCropClick(index)}
          >
            <CropCard
              name={crop.name}
              size={crop.size}
              histories={crop.histories}
              deleteCrop={this.deleteCrop}
              _id={crop._id}
            />
          </div>
        ))
    );
  };

  render() {
    const { addCrop, crops, forms } = this.props;
    const { displayIndex, displayMap } = this.state;

    return (
      <div>
        <div className='d-flex justify-content-around'>
          <div className='w-75 mt-4'>
            <h1>Crops</h1>
            <CustomForm
              actionSubmit={addCrop}
              inputsClass='justify-content-center mb-2'
              formName='add-crop'
              formButton='Add Crop'
              formItems={ADD_CROP_FORM_ITEMS}
            />
            <div className='row py-4 mt-4 bg-light'>
              <div
                className={classnames(
                  displayMap ? 'col-12 col-lg-6' : 'col-12'
                )}
              >
                <Pagination
                  contentClass='row pt-4'
                  hidePagination={displayMap}
                  handlePageChange={this.props.getCrop}
                >
                  {this.renderCrops()}
                </Pagination>
              </div>
              <div
                className={classnames(displayMap ? 'col-12 col-lg-6' : 'col-0')}
              >
                <CustomMap
                  addPolygon={area =>
                    this.setState(prevState => ({
                      areas: [...prevState.areas, area]
                    }))
                  }
                  displayMap={displayMap}
                  displayIndex={displayIndex}
                  initPolygons={areas => this.setState({ areas: areas })}
                  locations={
                    displayIndex !== -1 ? crops[displayIndex].locations : []
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ crops, forms }) => ({
  ...crops,
  ...forms
});

const mapDispatchToProps = {
  addCrop,
  deleteCrop,
  getCrop,
  loadCrops,
  updateCrop
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CropsPage);
