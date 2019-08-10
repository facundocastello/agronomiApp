import React, { Component } from "react";
import { connect } from "react-redux";

import { addBrand, deleteBrand, loadBrands } from "../store/brands";

class BrandsComponent extends Component {
  state = {
    articleBrand: "",
    articleName: "",
    brandName: "",
    pouch: "",
    users: []
  };

  componentDidMount() {
    this.props.loadBrands();
  }

  renderSelectBrands = () => {
    const { brands } = this.props;
    return (
      brands &&
      brands.map((element, index) => (
        <option id={element._id} key={`user-${index}`} selected={index === 0}>
          {element.name}
        </option>
      ))
    );
  };

  renderBrands = brands => {
    if (!brands) brands = this.props.brands;
    return (
      brands &&
      brands.map((brand, index) => (
        <div
          className="bg-warning"
          id={brand._id}
          key={`user-${index}`}
          selected={index === 0}
        >
          {brand.name}
          <div className="bg-danger" onClick={deleteBrand(brand._id)} >X</div>
        </div>
      ))
    );
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddBrand = () => {
    this.props.addBrand({ name: this.state.brandName });
  };

  render() {
    return (
      <div>
        <div className="d-flex justify-content-around">
          <div className="w-75 mt-4">
            <h1 className="bg-light">Brands</h1>
            <div className="d-flex">
              <div>Name</div>
              <div>
                <input
                  onChange={this.onInputChange}
                  name="brandName"
                  type="text"
                />
              </div>
            </div>
            <a class='bg-warning p-2 rounded border' onClick={this.handleAddBrand}>Add brand</a>
            <div className="pt-4">{this.renderBrands()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ articles, brands, test }) => ({
  ...test,
  ...articles,
  ...brands
});

const mapDispatchToProps = {
  addBrand,
  deleteBrand,
  loadBrands
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandsComponent);
