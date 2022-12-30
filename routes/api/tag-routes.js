const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.FindAll({
      include : [{
        model : Product
      }]
    })
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try { 
    const tagData = await Tag.findByPK(req.params.id, {
      include: [{
        model: Product
      }]
    });
    if (!tagData){
      res.status(404).json({ message : 'There is no tag with the id ' + req.params.id});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try { 
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      id: req.params.id,
      tag_name: req.body.tag_name
    }, { 
      where: {
      id: req.params.id
    }
    });
    if(!updateTag) {
      res.status(404).json({ message: "There is no tag with that id" + req.params.id });
    }
    res.status(200).json(updateTag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const updateTag = await Tag.Destroy({
      where : {
        id: req.params.id
      }
    });

  if (!updateTag) {
    res.status(404).json({ message: "There is no tag with this id! Please try again." });
    return;
  }
  res.status(200).json(updateTag);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
