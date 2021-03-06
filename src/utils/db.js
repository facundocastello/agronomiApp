import { isArray } from 'util';

const PouchDB = require('pouchdb').default;
PouchDB.plugin(require('pouchdb-find').default);
// PouchDB.plugin(require('pouchdb-debug'));
const db = new PouchDB('dbname');
const remoteCouch = 'https://admin:admin@192.168.0.27:6984/dbname';

// PouchDB.debug.enable('*');

var opts = { live: true, retry: true };
db.replicate.to(remoteCouch, opts);
db.replicate.from(remoteCouch, opts);
db.createIndex({
  index: { fields: ['elementType'] }
});

export default db;

export const addData = (elementType, data) => {
  return db.put({
    _id: new Date().toISOString(),
    elementType: elementType,
    ...data
  });
};

export const addMultiples = data => {
  return db.bulkDocs([data]);
};

export const updateData = (data, id) => {
  return db.get(id).then(function(doc) {
    doc = { ...doc, ...data };
    db.put(doc);
  });
};

export const deleteData = id => {
  return db.get(id).then(function(doc) {
    return db.remove(doc);
  });
};

export const deleteDataRecursive = filter => {
  db.find({
    selector: {
      ...filter
    }
  }).then(async res => {
    for (let indexDoc = 0; indexDoc < res.docs.length; indexDoc++) {
      const doc = res.docs[indexDoc];
      await deleteDataRecursive({ [doc.elementType]: doc._id });
      db.remove(doc);
    }
  });
};

export const listenTo = (filter, value, dispatch, action) => {
  db.changes({
    since: 'now',
    live: true,
    include_docs: true,
    filter: doc => {
      return doc[filter] === value || doc._deleted;
    }
  }).on('change', res => {
    dispatch(action(res));
  });
};

export const getDataByType = ({
  elementType,
  filters,
  relations,
  perPage,
  page
}) => {
  return db
    .find({
      selector: {
        elementType: elementType,
        ...filters
      },
      sort: ['_id'],
      skip: page ? page * perPage : 0,
      limit: perPage ? perPage : 12
    })
    .then(async res => {
      if (relations && relations.length > 0) {
        //Go through the docs looking for relations
        for (let indexDoc = 0; indexDoc < res.docs.length; indexDoc++) {
          const doc = res.docs[indexDoc];
          res.docs[indexDoc] = await iterateRelationsRecursive(
            relations,
            doc,
            getDataById
          );
        }

        return Promise.resolve(res);
      } else {
        return Promise.resolve(res);
      }
    });
};

export const getDataById = ({ id, relations }) => {
  return db
    .get(id)
    .then(async res => {
      if (relations && relations.length > 0) {
        res = await iterateRelationsRecursive(relations, res, getDataById);
      }
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.resolve('');
    });
};

export const iterateRelationsRecursive = async (
  relations,
  res,
  getDataFunction
) => {
  for (
    let indexRelations = 0;
    indexRelations < relations.length;
    indexRelations++
  ) {
    const relation = relations[indexRelations];
    let resRelations = [];
    if (res[relation.name] && res[relation.name] !== '') {
      //If have multiple childs, get all of them
      if (!isArray(res[relation.name])) {
        res[relation.name] = [res[relation.name]];
      }
      const childrens = res[relation.name];
      for (
        let indexChildrens = 0;
        indexChildrens < childrens.length;
        indexChildrens++
      ) {
        const resRelation = await getDataFunction({
          id: childrens[indexChildrens],
          relations: relation.relations
        });
        resRelations.push(resRelation);
      }
      // debugger
    }
    res[relation.name] = resRelations;
  }

  return res;
};
// db.allDocs({ include_docs: true, descending: true }).then(res => {
//   dispatch(receiveUsers(res.rows));
// });
