const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  }).then((categories) => {
    res.json(categories);
  }).catch((err) => res.json(err));
  
});

router.get('/:id', (req, res) => {
  Category.findOne({
    include: [Product],
    where: {
      id: req.params.id
    }
  }).then((categoryById) => {
    res.json(categoryById);
  }).catch((err) => res.json(err));
  
});

router.post('/', (req, res) => {
   Category.create(req.body)
   .then((newCategory) => {
     res.json(newCategory);
   }).catch((err) => res.json(err));
   
});

router.put('/:id', (req, res) => {
   Category.update(
     {
       category_name: req.body.category_name
     },
     {
       where: {
         id: req.params.id,
       },
     }
   ).then((updateCategory) => {
     res.json(updateCategory);
   }).catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
   Category.destroy({
     where: {
       id: req.params.id,
     },
   }).then((delCategory) => {
     res.json(delCategory);
   }).catch((err) => res.json(err));
});

module.exports = router;
