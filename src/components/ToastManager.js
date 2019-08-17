import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastManager extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { errors, successMessage } = this.props;
    if (prevProps.errors !== errors) {
      const errorKeys = Object.keys(errors);
      if (errorKeys.length === 0) return;
      const Message = () =>
        errorKeys.map(key => (
          <div key={key}>
            <strong className='text-capitalize'>{key}</strong>
            {errors[key].map((error, index) => (
              <li key={`${key}-${index}`}>{error}</li>
            ))}
          </div>
        ));
      this.notifyError(Message);
    }
    if (prevProps.successMessage !== successMessage) {
      this.notifySuccess(successMessage);
    }
  }

  notifyError = Message => toast.error(<Message />);
  notifySuccess = message => toast.success(message);

  render() {
    return <ToastContainer />;
  }
}

const mapStateToProps = ({ ui }) => ({ ...ui });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastManager);
