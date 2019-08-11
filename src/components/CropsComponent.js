import React, { Component } from "react";
import { connect } from "react-redux";
import { isArray } from "util";

import CustomForm from "./CustomForm";

import { addCrop, deleteCrop, loadCrops } from "../store/crops";
import CustomMap from "./CustomMap";

class CropsComponent extends Component {
  componentDidMount() {
    this.props.loadCrops();
  }

  renderCrops = () => {
    const { crops } = this.props;
    return (
      crops &&
      crops.map((crop, index) => (
        <div className="d-flex col-3" key={`user-${index}`}>
          <div className="p-3 border rounded m-3 w-100">
            <div className="d-flex justify-content-around">
              <div className="d-flex flex-column">
                <strong>Name</strong> {crop.name}
              </div>
              <div className="d-flex flex-column">
                <strong>Size</strong> {crop.size}
              </div>
              <div className="d-flex flex-column">
                <strong>Location</strong> {crop.location}
              </div>
            </div>
            <div className="bg-danger" onClick={deleteCrop(crop._id)}>
              X
            </div>
          </div>
        </div>
      ))
    );
  };

  render() {
    const { addCrop, crops, cropTypes } = this.props;

    return (
      <div>
        <div className="d-flex justify-content-around">
          <div className="w-75 mt-4">
            <h1 className="bg-light">Crops</h1>
            <CustomForm
              formName="add-crop"
              formButton="Add Crop"
              actionSubmit={addCrop}
              formItems={{
                name: {
                  className: "col-3",
                  title: "Name"
                },
                size: {
                  className: "col-3",
                  title: "Size"
                },
                location: {
                  className: "col-3",
                  title: "Location"
                }
              }}
            />
            <div className="row pt-4">{this.renderCrops()}</div>
          </div>
        </div>
        <CustomMap />
      </div>
    );
  }
}

const mapStateToProps = ({ crops }) => ({
  ...crops
});

const mapDispatchToProps = {
  addCrop,
  deleteCrop,
  loadCrops
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CropsComponent);
