'use strict';

const knex = require('../knex');

knex.select('notes.id', 'title', 'content', 'folders.id as folder_id', 'folders.name as folderName')
  .from('notes')
  .leftJoin('folders', 'notes.folder_id', 'folders.id')
  .where('id', 1004)
  .returning(['id', 'title', 'content', 'folder_id'])
  .update({
    'title': 'new title',
    'content': 'dgdfgdgfdgdg',
    'folder_id' : 100
  })
// .then(()=> {
//   knex.del()
//     .from('notes')
//     .where('notes_tags', )
// })
  .then(([item]) => {
    // if (item) {
    //   res.json(item);
    // } else {
    //   next();
    // }
    console.log(item);
  })
  .catch(err => next(err));
  