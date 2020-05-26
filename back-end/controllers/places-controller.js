const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordinates = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');
const fs = require('fs');

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find the place', 500)
    );
  }

  if (!place) {
    return next(
      new HttpError('Could not find a place for provided place id', 404)
    );
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(
      new HttpError('Fetching places failed, please try again later', 500)
    );
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for provided user id', 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title, address, description } = req.body;

  const coordinates = await getCoordinates(address);

  const createdPlace = new Place({
    title,
    address,
    description,
    creator: req.userData.userId,
    image: req.file.path,
    location: coordinates,
  });

  let user;

  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { title, description } = req.body;

  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update the place', 500)
    );
  }

  if (place.creator.toString() !== req.userData.userId) {
    return next(new HttpError('You are not allowed to update this place', 401));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update the place',
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete the place', 500)
    );
  }

  if (!place) {
    const error = new HttpError('Could not find place for provided id', 404);
    return next(error);
  }

  const imagePath = place.image;

  if (place.creator.id !== req.userData.userId) {
    return next(new HttpError('You are not allowed to delete this place', 401));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.delete({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete the place',
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => console.log(err));

  res.status(200).json({ message: 'Deleted place' });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
