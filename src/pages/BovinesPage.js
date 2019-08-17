import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomForm from '../components/CustomForm';
import BovineCard from '../components/BovineCard';
import Pagination from '../components/Pagination';

import {
  addBovine,
  deleteBovine,
  loadBovines,
  getBovine
} from '../store/bovines';
import { loadBovineTypes } from '../store/bovineTypes';
import { loadBatches } from '../store/batches';
import { ADD_BOVINE_FORM_ITEMS } from '../utils/constants';
import QuestionModal from '../components/QuestionModal';

class BovinesPage extends Component {
  state = {
    deleteBovineId: undefined
  };

  componentDidMount() {
    this.props.loadBovines();
    this.props.loadBovineTypes();
    this.props.loadBatches();
  }

  handleDeleteClick = _id => {
    this.setState({
      deleteBovineId: _id
    });
  };

  renderBovines = () => {
    const { bovines, deleteBovine } = this.props;
    return (
      bovines &&
      bovines.map((bovine, index) => (
        <div className='d-flex col-12 col-md-6 col-lg-3' key={`user-${index}`}>
          <BovineCard
            {...bovine}
            deleteBovine={this.handleDeleteClick}
            type={bovine.type[0].name}
          />
        </div>
      ))
    );
  };

  render() {
    const { addBovine, batches, bovines, bovineTypes } = this.props;
    const { deleteBovineId } = this.state;

    return (
      <div>
        <div className='d-flex justify-content-around'>
          <div className='w-75 mt-4'>
            <h1>Bovines</h1>
            <CustomForm
              formName='add-bovine'
              formButton='Add Bovine'
              actionSubmit={addBovine}
              formItems={ADD_BOVINE_FORM_ITEMS(batches, bovineTypes, bovines)}
            />
            <div className='row py-4 mt-4 bg-light'>
              <Pagination
                contentClass='row pt-4'
                handlePageChange={this.props.getBovine}
              >
                {this.renderBovines()}
              </Pagination>
            </div>
          </div>
        </div>
        <QuestionModal
          active={deleteBovineId}
          acceptAction={() => {
            this.props.deleteBovine(deleteBovineId);
            this.setState({ deleteBovineId: undefined });
          }}
          denyAction={() => this.setState({ deleteBovineId: undefined })}
        >
          Are you sure you want to delte this bovine? It'll remove the relation
          with it's historials
        </QuestionModal>
      </div>
    );
  }
}

const mapStateToProps = ({ batches, bovines, bovineTypes }) => ({
  ...batches,
  ...bovines,
  ...bovineTypes
});

const mapDispatchToProps = {
  addBovine,
  deleteBovine,
  getBovine,
  loadBatches,
  loadBovines,
  loadBovineTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BovinesPage);
