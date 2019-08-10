import React, { Component } from "react";
import { connect } from "react-redux";

import { addBovine, deleteBovine, loadBovines } from "../store/bovines";
import { isArray } from "util";

class BovinesComponent extends Component {
  state = {
    bovineParent: "",
    bovineName: "",
    parentName: "",
    pouch: "",
    users: []
  };

  componentDidMount() {
    this.props.loadBovines();
  }



  renderSelectParents = () => {
    const { bovines } = this.props;
    return (
      bovines &&
      bovines.map((element, index) => (
        <option id={element._id} key={`user-${index}`}>
          {element.name}
        </option>
      ))
    );
  };

  renderParents = parents => {
    if (!parents) parents = this.props.bovines;
    return (
      parents &&
      parents.map((parent, index) => (
        <div
          className="bg-warning"
          id={parent._id}
          key={`user-${index}`}
          selected={index === 0}
        >
          {parent.name}
          {/* <div className="bg-danger" onClick={deleteParent(parent._id)} >X</div> */}
        </div>
      ))
    );
  };

  renderBovines = () => {
    const { bovines } = this.props;
    return (
      bovines &&
      bovines.map((bovine, index) => (
        <div className="d-flex" key={`user-${index}`}>
          {bovine.name}{" "}
          {isArray(bovine.parent)
            ? this.renderParents(bovine.parent)
            : this.renderParents([bovine.parent])}
          <div className="bg-danger" onClick={deleteBovine(bovine._id)}>
            X
          </div>
        </div>
      ))
    );
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddParent = () => {
    this.props.addParent({ name: this.state.parentName });
  };

  handleAddBovine = () => {
    let { bovineParent } = this.state;
    // if (bovineParent === "") bovineParent = this.props.bovines.length > 0 ? this.props.bovines[0]._id : '';
    this.props.addBovine({
      name: this.state.bovineName,
      parent: bovineParent
    });
  };

  handleSelect = event => {
    this.setState({
      bovineParent: this.props.bovines[event.target.selectedIndex-1]._id
    });
  };

  render() {
    return (
      <div>
        <div className="d-flex justify-content-around">
          <div className="w-75 mt-4">
            <h1 className="bg-light">Bovines</h1>
            <div className="d-flex">
              <div>Name</div>
              <div>
                <input
                  onChange={this.onInputChange}
                  name="bovineName"
                  type="text"
                />
              </div>
            </div>
            <div className="d-flex">
              <div>Parent</div>
              <div>
                <select onChange={this.handleSelect} name="bovineParent" defaultValue={0}>
                  <option></option>
                  {this.renderSelectParents()}
                </select>
              </div>
            </div>
            <a class='bg-warning p-2 rounded border' onClick={this.handleAddBovine}>Add Bovine</a>
            <div className="pt-4">{this.renderBovines()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bovines }) => ({
  ...bovines,
});

const mapDispatchToProps = {
  addBovine,
  deleteBovine,
  loadBovines,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BovinesComponent);
