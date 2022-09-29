const HttpError = require("../models/http-error");

const DUMMY = [
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid; //holds object: {uid:"u1"}
  const place = DUMMY.find((p) => {
    return p.creator === userId;
  });
  if (!place) {
    return next(
      new HttpError("No place found for user id:" + userId + "!", 404)
    );
  }
  res.json({ place });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
