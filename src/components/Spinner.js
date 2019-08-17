import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

function Spinner({ active }) {
  return (
    <div
      className='spinner text-green'
      style={active ? spinnerStyle : { display: 'none' }}
    >
      <i className='fa fa-4x fa-spinner fa-pulse' />
    </div>
  );
}

const mapStateToProps = ({ ui }) => ({
  active: ui.activeSpinner
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spinner);

const spinnerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1001'
};
