const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }]
  }).then((allTags) => {
    res.json(allTags);
  }).catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    include: [{ model: Product, through: ProductTag }],
    where: {
      id: req.params.id,
    }
  }).then((tagById) => {
    res.json(tagById);
  }).catch((err) => res.json(err));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  }).catch((err) => res.json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id,
    },
  }).then((updateTag) => {
    res.json(updateTag);
  }).catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deleteTag) => {
    res.json(deleteTag);
  }).catch((err) => res.json(err));
});

module.exports = router;
