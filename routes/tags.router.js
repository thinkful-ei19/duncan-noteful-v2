'use strict';

const express = require('express');

const router = express.Router();

const knex = require('../knex');


router.get('/tags', (req, res, next) => {
  knex.select('id', 'name')
    .from('tags')
    .then(result => {
      res.json(result);
    })
    .catch(next);
});


router.get('/tags/:id', (req, res, next) => {
  const {id} = req.params;
  knex.select('id', 'name')
    .from('tags')
    .where('id', id)
    .then(([result]) => {
      res.json(result);
    })
    .catch(next);
});

router.put('/tags/:id', (req, res, next) => {
  const {name} = req.body;
  const {id} = req.params;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const updateObj = { name };

  knex.select('id', 'name')
    .from('tags')
    .where('id', id)
    .update(updateObj)
    .returning(['id', 'name'])
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(next);

});


router.post('/tags', (req, res, next) => {
  const { name } = req.body;
  
  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  
  const newItem = { name };
  
  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then(results => {
      // Uses Array index solution to get first item in results array
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});


router.delete('/tags/:id', (req, res, next) => {
  const {id} = req.params;
  knex.select('id', 'name')
    .from('tags')
    .where('id', id)
    .del()
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch(next);
});


module.exports = router;