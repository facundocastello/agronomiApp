import React, { Component } from "react";
import { connect } from "react-redux";

import { addBovine, deleteBovine, loadBovines } from "../store/bovines";
import { loadBovineTypes } from "../store/bovineTypes";
import { isArray } from "util";
import Input from "./Input";

class BovinesComponent extends Component {
  state = {
    bovineParent: "",
    bovineName: "",
    bovineType: "",
    pouch: "",
    users: []
  };

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

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddBovine = () => {
    let { bovineParent } = this.state;
    // if (bovineParent === "") bovineParent = this.props.bovines.length > 0 ? this.props.bovines[0]._id : '';
    this.props.addBovine({
      name: this.state.bovineName,
      type: this.state.bovineType,
      parent: bovineParent
    });
  };

  handleSelect = (event, elements) => {
    this.setState({
      [event.target.name]: elements[event.target.selectedIndex - 1]._id
    });
  };

  render() {
    const { bovines, bovineTypes } = this.props;

    return (
      <div>
        <div className="d-flex justify-content-around">
          <div className="w-75 mt-4">
            <h1 className="bg-light">Bovines</h1>
            <div className="row mb-5">
              <Input
                className="col-3"
                title="Name"
                name="bovineName"
                onInputChange={this.onInputChange}
              />
              <Input
                className="col-3"
                elements={bovineTypes}
                title="Type"
                type="select"
                name="bovineType"
                onInputChange={this.handleSelect}
              />
              <Input
                className="col-3"
                elements={bovines}
                title="Parent"
                type="select"
                name="bovineParent"
                onInputChange={this.handleSelect}
              />
            </div>
            <a
              className="bg-warning p-2 rounded border"
              onClick={this.handleAddBovine}
            >
              Add Bovine
            </a>
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
