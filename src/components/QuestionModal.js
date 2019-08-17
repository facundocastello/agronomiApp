import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Button from './Button';
import Modal from './Modal';

function QuestionModal({
  active,
  acceptAction,
  acceptText,
  children,
  denyAction,
  denyText
}) {
  return (
    <Modal active={active} type='swal'>
      <div className='d-flex flex-column h-100 p-3 justify-content-between'>
        <h4 className='font-weight-bold'>{children}</h4>
        <div className='d-flex justify-content-center'>
          <Button
            className='bg-success font-weight-bold text-dark mr-2'
            clickedButton={acceptAction}
          >
            {acceptText ? acceptText : 'Accept'}
          </Button>
          <Button
            className='bg-danger font-weight-bold text-dark'
            clickedButton={denyAction}
          >
            {denyText ? denyText : 'Deny'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default QuestionModal;
