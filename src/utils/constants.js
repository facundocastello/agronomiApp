export const ADD_BOVINE_FORM_ITEMS = (batches, bovineTypes, bovines) => ({
  caravane: {
    title: 'Caravane'
  },
  internCaravane: {
    title: 'Intern Caravane'
  },
  name: {
    title: 'Name'
  },
  batch: {
    elements: batches,
    title: 'Batch',
    type: 'select',
    indexName: '_id'
  },
  type: {
    elements: bovineTypes,
    title: 'Type',
    type: 'select',
    indexName: '_id'
  },
  parent: {
    elements: bovines,
    emptyElement: { _id: '', name: 'No Parent' },
    title: 'Parent',
    type: 'select',
    indexName: '_id'
  }
});

export const ADD_BATCH_FORM_ITEMS = {
  name: {
    title: 'Name'
  },
  color: {
    title: 'Color'
  }
};

export const ADD_CROP_HISTORY_FORM_ITEMS = {
  description: {
    title: 'Description'
  },
  type: {
    elements: [{ name: 'sow' }, { name: 'harvest' }],
    title: 'Type',
    type: 'select',
    indexName: 'name'
  },
  cultive: {
    elements: [{ name: 'soy' }, { name: 'wheat' }],
    title: 'Cultive',
    type: 'select',
    indexName: 'name'
  }
};

export const ADD_CROP_FORM_ITEMS = {
  name: {
    title: 'Name'
  }
};
