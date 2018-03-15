'use strict';

const knex = require('../knex');

knex.select('notes.id', 'title', 'content', 'folders.id as folder_id', 'folders.name as folderName', 'tags.id as tagsid', 'tags.name')
  .from('notes')
  .leftJoin('folders', 'notes.folder_id', 'folders.id')
  .leftJoin('notes_tags', 'notes.id', 'notes_tags.note_id')
  .leftJoin('tags', 'tags.id', 'notes_tags.tag_id')
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  });