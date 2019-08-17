import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { receiveModal } from '../store/ui';

class Modal extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.active !== this.props.active) {
      this.props.receiveModal(
        this.props.active !== undefined && this.props.active !== false
      );
    }
  }

  render() {
    const { active, children, type } = this.props;
    var size = '';
    switch (type) {
      case 'swal':
        size = 'w-25 h-25';
        break;
      case 'form':
        size = 'w-75 h-75';
        break;
      default:
        size = 'w-50 h-50';
        break;
    }
    return (
      <div
        className={classnames('Modal border rounded text-green', size)}
        style={active ? modalStyle : { display: 'none' }}
      >
        {children}
      </div>
    );
  }
}

const modalStyle = {
  //   width: '100px',
  height: '100px',
  backgroundColor: 'white',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1001',
  minWidth: '350px',
  maxWidth: '1000px'
};

const mapDispatchToProps = { receiveModal };

export default connect(
  () => ({}),
  mapDispatchToProps
)(Modal);
