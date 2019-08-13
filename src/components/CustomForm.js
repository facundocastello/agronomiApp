import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Input from "./Input";

import { receiveFormValue } from "../store/forms";

class CustomForm extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  componentDidMount() {
    const { formName, formItems } = this.props;
    const items = Object.keys(formItems).forEach(element => {
      this.props.receiveFormValue(formName, {
        [element]: formItems[element].defaultValue
      });
    });
  }

  handleSubmit = () => {
    const { forms, formName } = this.props;
    this.props.actionSubmit(forms[formName] ? forms[formName] : {});
  };

  onInputChange = event => {
    const { formItems, formName } = this.props;

    switch (event.target.type) {
      case "select-one":
        const elements = formItems[event.target.name].elements;
        this.props.receiveFormValue(formName, {
          [event.target.name]:
            event.target.selectedIndex === 0
              ? ""
              : elements[event.target.selectedIndex - 1][
                  event.target.getAttribute("indexname")
                ]
        });
        break;

      default:
        this.props.receiveFormValue(formName, {
          [event.target.name]: event.target.value
        });
        break;
    }
  };

  renderFormItems = () => {
    const { formItems, formName } = this.props;
    return Object.keys(formItems).map((item, index) => (
      <Input
        key={`${formName}-${index}`}
        className={formItems[item].className}
        elements={formItems[item].elements}
        indexName={formItems[item].indexName}
        name={item}
        defaultValue={formItems[item].defaultValue}
        title={formItems[item].title}
        type={formItems[item].type}
        onInputChange={this.onInputChange}
      />
    ));
  };

  render() {
    const { className, formButton } = this.props;
    return (
      <div className={classnames(className)}>
        <div className="row mb-3">{this.renderFormItems()}</div>
        <a
          className="bg-warning p-2 rounded border"
          onClick={this.handleSubmit}
        >
          {formButton}
        </a>
      </div>
    );
  }
}

const mapStateToProps = ({ forms }) => ({ ...forms });

const mapDispatchToProps = { receiveFormValue };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomForm);
