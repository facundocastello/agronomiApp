import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

function BackDrop({ active }) {
  if(active){
    document.body.style.overflow = "hidden"
  }else{
    document.body.style.overflow = "unset"
  }
  // document.body.style.overflow = "hidden"
  return (
    <div
      className='backdrop'
      style={active ? backdropStyle : { display: 'none' }}
    />
  );
}

const mapStateToProps = ({ ui }) => ({
  active: ui.activeModal || ui.activeSpinner
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackDrop);

const backdropStyle = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  background: 'rgba(0, 0, 0, 0.8)',
  zIndex: '1000'
};
