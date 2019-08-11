import React, { Component } from "react";
import { connect } from "react-redux";
import { isArray } from "util";

import CustomForm from "./CustomForm";

import { loadBovineTypes } from "../store/bovineTypes";
import { addBovine, deleteBovine, loadBovines } from "../store/bovines";

class BovinesComponent extends Component {
  componentDidMount() {
    this.props.loadBovines();
    this.props.loadBovineTypes();
  }

  renderParents = parents => {
    if (!parents) parents = this.props.bovines;
    return (
      parents &&
      parents.length > 0 && (
        <div className="d-flex">
          <strong>Parents:</strong>
          {parents.map((parent, index) => (
            <div
              className="bg-warning"
              id={parent._id}
              key={`user-${index}`}
              selected={index === 0}
            >
              {parent.name}
              {/* <div className="bg-danger" onClick={deleteParent(parent._id)} >X</div> */}
            </div>
          ))}
        </div>
      )
    );
  };

  renderBovines = () => {
    const { bovines } = this.props;
    return (
      bovines &&
      bovines.map((bovine, index) => (
        <div className="d-flex col-3" key={`user-${index}`}>
          <div className="p-3 border rounded m-3 w-100">
            <div>
              <strong>Name</strong> {bovine.name}
            </div>
            {isArray(bovine.parent)
              ? this.renderParents(bovine.parent)
              : this.renderParents([bovine.parent])}
            <div className="bg-danger" onClick={deleteBovine(bovine._id)}>
              X
            </div>
          </div>
        </div>
      ))
    );
  };

  render() {
    const { addBovine, bovines, bovineTypes } = this.props;

    return (
      <div>
        <div className="d-flex justify-content-around">
          <div className="w-75 mt-4">
            <h1 className="bg-light">Bovines</h1>
            <CustomForm
              formName="add-bovine"
              formButton="Add Bovine"
              actionSubmit={addBovine}
              formItems={{
                name: {
                  className: "col-3",
                  title: "Name"
                },
                type: {
                  className: "col-3",
                  elements: bovineTypes,
                  title: "Type",
                  type: "select",
                  indexName: "_id"
                },
                parent: {
                  className: "col-3",
                  elements: bovines,
                  title: "Parent",
                  type: "select",
                  indexName: "_id"
                }
              }}
            />
            <div className="row pt-4">{this.renderBovines()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bovines, bovineTypes }) => ({
  ...bovines,
  ...bovineTypes
});

const mapDispatchToProps = {
  addBovine,
  deleteBovine,
  loadBovines,
  loadBovineTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BovinesComponent);
