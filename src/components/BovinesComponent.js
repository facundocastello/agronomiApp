import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomForm from './CustomForm';

import { loadBovineTypes } from '../store/bovineTypes';
import { addBovine, deleteBovine, loadBovines } from '../store/bovines';
import BovineCard from './BovineCard';

class BovinesComponent extends Component {
  componentDidMount() {
    this.props.loadBovines();
    this.props.loadBovineTypes();
  }

  renderBovines = () => {
    const { bovines, deleteBovine } = this.props;
    return (
      bovines &&
      bovines.map((bovine, index) => (
        <div className='d-flex col-3' key={`user-${index}`}>
          <BovineCard
            {...bovine}
            deleteBovine={deleteBovine}
            type={bovine.type[0].name}
          />
        </div>
      ))
    );
  };

  render() {
    const { addBovine, bovines, bovineTypes } = this.props;

    return (
      <div>
        <div className='d-flex justify-content-around'>
          <div className='w-75 mt-4'>
            <h1 className='bg-light'>Bovines</h1>
            <CustomForm
              formName='add-bovine'
              formButton='Add Bovine'
              actionSubmit={addBovine}
              formItems={{
                caravane: {
                  className: 'col-3',
                  title: 'Caravane'
                },
                internCaravane: {
                  className: 'col-3',
                  title: 'Intern Caravane'
                },
                name: {
                  className: 'col-3',
                  title: 'Name'
                },
                type: {
                  className: 'col-3',
                  elements: bovineTypes,
                  title: 'Type',
                  type: 'select',
                  indexName: '_id'
                },
                parent: {
                  className: 'col-3',
                  elements: bovines,
                  emptyElement: { _id: '', name: 'No Parent' },
                  title: 'Parent',
                  type: 'select',
                  indexName: '_id'
                }
              }}
            />
            <div className='row pt-4'>{this.renderBovines()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bovines, bovineTypes }) => ({
  ...bovines,
  ...bovineTypes
});

const mapDispatchToProps = {
  addBovine,
  deleteBovine,
  loadBovines,
  loadBovineTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BovinesComponent);
