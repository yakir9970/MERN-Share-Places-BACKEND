const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const getCoordsForAddress = require("../util/location");

let DUMMY = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky acrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "350 Fifth Avenue · Manhattan, New York 10118",
    location: {
      lat: 40.748441,
      lng: -73.985664,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky acrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "350 Fifth Avenue · Manhattan, New York 10118",
    location: {
      lat: 40.748441,
      lng: -73.985664,
    },
    creator: "u2",
  },
  {
    id: "p3",
    title: "Empire State Building",
    description: "One of the most famous sky acrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "350 Fifth Avenue · Manhattan, New York 10118",
    location: {
      lat: 40.748441,
      lng: -73.985664,
    },
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; //holds object: {pid:"p1"}
  const place = DUMMY.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    return next(new HttpError("No place found!", 404));
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid; //holds object: {uid:"u1"}
  const places = DUMMY.filter((p) => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    return next(
      new HttpError("No places found for user id:" + userId + "!", 404)
    );
  }
  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Input!", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Input!", 422));
  }
  const { title, description } = req.body;
  const placeId = req.params.pid; //holds object: {pid:"p1"}

  const updatedPlace = { ...DUMMY.find((p) => p.id === placeId) };
  const placeIndex = DUMMY.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid; //holds object: {pid:"p1"}

  if (!DUMMY.find((p) => p.id === placeId)) {
    return next(new HttpError("Place Not Found!", 404));
  }
  DUMMY = DUMMY.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Place Deleted Successfully!" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
