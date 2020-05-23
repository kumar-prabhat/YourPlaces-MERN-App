const express = require('express');
const { check } = require('express-validator');
const placeController = require('../controllers/places-controller');

const router = express.Router();

router.get('/:pid', placeController.getPlaceById);

router.get('/user/:uid', placeController.getPlacesByUserId);

router.post(
  '/',
  [
    check('title', 'Title field is required').not().isEmpty(),
    check(
      'description',
      'Description length should be of 5 characters atleast'
    ).isLength({ min: 5 }),
    check('address', 'Address field is required').not().isEmpty(),
  ],
  placeController.createPlace
);

router.patch(
  '/:pid',
  [
    check('title', 'Title field is required').not().isEmpty(),
    check(
      'description',
      'Description length should be of 5 characters atleast'
    ).isLength({ min: 5 }),
  ],
  placeController.updatePlace
);

router.delete('/:pid', placeController.deletePlace);

module.exports = router;
