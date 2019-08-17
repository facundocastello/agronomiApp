import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomForm from '../components/CustomForm';
import BatchCard from '../components/BatchCard';
import Pagination from '../components/Pagination';

import { addBatch, deleteBatch, loadBatches, getBatch } from '../store/batches';
import { ADD_BATCH_FORM_ITEMS } from '../utils/constants';

class BatchesPage extends Component {
  componentDidMount() {
    this.props.loadBatches();
  }

  renderBatches = () => {
    const { batches, deleteBatch } = this.props;
    return (
      batches &&
      batches.map((batch, index) => (
        <div className='d-flex col-12 col-md-6 col-lg-3' key={`user-${index}`}>
          <BatchCard {...batch} deleteBatch={deleteBatch} />
        </div>
      ))
    );
  };

  render() {
    const { addBatch } = this.props;

    return (
      <div>
        <div className='d-flex justify-content-around'>
          <div className='w-75 mt-4'>
            <h1>Batches</h1>
            <CustomForm
              formName='add-batch'
              formButton='Add Batch'
              actionSubmit={addBatch}
              formItems={ADD_BATCH_FORM_ITEMS}
            />
            <div className='row py-4 mt-4 bg-light'>
              <Pagination
                contentClass='row pt-4'
                handlePageChange={this.props.getBatch}
              >
                {this.renderBatches()}
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ batches }) => ({
  ...batches
});

const mapDispatchToProps = {
  addBatch,
  deleteBatch,
  getBatch,
  loadBatches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BatchesPage);
