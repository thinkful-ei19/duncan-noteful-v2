'use strict';

const knex = require('../knex');

const newItem = {
  'foo': 'bar'
};

knex.insert(newItem).into('notes').then(res => {console.log(res);});

// knex.select().from('notes').where('id', 1020).then(console.log);
  