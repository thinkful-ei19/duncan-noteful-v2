'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

const knex = require('../knex');


router.get('/folders', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get('/folders/:id', (req, res, next) =>{
  const {id} = req.params;
  knex.select('id', 'name')
    .from('folders')
    .where('id', id)
    .then(([results]) =>{
      if (results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});



module.exports = router;