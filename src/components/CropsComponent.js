import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import CustomForm from './CustomForm';
import CustomMap from './CustomMap';
import CropCard from './CropCard';

import { addCrop, deleteCrop, loadCrops, updateCrop } from '../store/crops';

class CropsComponent extends Component {
  state = {
    displayMap: false,
    displayIndex: -1,
    areas: []
  };

  componentDidMount() {
    this.props.loadCrops();
  }

  deleteLocations = () => this.state.areas.map(area => area.setMap(null));

  getLocations = () =>
    this.state.areas.map(area => {
      
      return area
        .getPaths()
        .getArray()[0]
        .j.map(path => ({ lat: path.lat(), lng: path.lng() }));
    });

  handleSaveSubmit = addCropParams => {
    
    const { _id, ...cropData } = addCropParams;
    this.props.updateCrop({ ...cropData, locations: this.getLocations() }, _id);
    this.deleteLocations();
    this.setState({
      displayIndex: -1,
      displayMap: false
    });
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
          name={crops[displayIndex].name}
          size={crops[displayIndex].size}
          location={crops[displayIndex].location}
        />

        <div onClick={() => this.handleSaveSubmit(crops[displayIndex])}>
          asd
        </div>
      </div>
    ) : (
      crops &&
        crops.map((crop, index) => (
          <div
            className='col-3'
            key={`user-${index}`}
            onClick={() => this.handleCropClick(index)}
          >
            <CropCard
              name={crop.name}
              size={crop.size}
              location={crop.location}
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
            <h1 className='bg-light'>Crops</h1>
            <CustomForm
              formName='add-crop'
              formButton='Add Crop'
              actionSubmit={addCrop}
              formItems={{
                name: {
                  className: 'col-3',
                  title: 'Name'
                },
                size: {
                  className: 'col-3',
                  title: 'Size'
                },
                location: {
                  className: 'col-3',
                  title: 'Location'
                }
              }}
            />
            <div className='row mt-4'>
              <div
                className={classnames(
                  displayMap ? 'col-12 col-lg-6' : 'col-12'
                )}
              >
                <div className='row pt-4'>{this.renderCrops()}</div>
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

const areaForm = initValues => ({
  pointALat: {
    className: 'col-6 col-lg-3',
    title: '1st Lat',
    defaultValue: initValues[0].lat
  },
  pointALng: {
    className: 'col-6 col-lg-3',
    title: '1st Lng',
    defaultValue: initValues[0].lng
  },
  pointBLat: {
    className: 'col-6 col-lg-3',
    title: '2nd Lat',
    defaultValue: initValues[1].lat
  },
  pointBLng: {
    className: 'col-6 col-lg-3',
    title: '2nd Lng',
    defaultValue: initValues[1].lng
  },
  pointCLat: {
    className: 'col-6 col-lg-3',
    title: '3th Lat',
    defaultValue: initValues[2].lat
  },
  pointCLng: {
    className: 'col-6 col-lg-3',
    title: '3th Lng',
    defaultValue: initValues[2].lng
  },
  pointDLat: {
    className: 'col-6 col-lg-3',
    title: '4th Lat',
    defaultValue: initValues[3].lat
  },
  pointDLng: {
    className: 'col-6 col-lg-3',
    title: '4th Lng',
    defaultValue: initValues[3].lng
  }
});

const mapStateToProps = ({ crops, forms }) => ({
  ...crops,
  ...forms
});

const mapDispatchToProps = {
  addCrop,
  deleteCrop,
  loadCrops,
  updateCrop
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CropsComponent);
