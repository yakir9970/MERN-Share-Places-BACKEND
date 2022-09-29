const express = require("express");

const router = express.Router();

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
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; //holds object: {pid:"p1"}
  const place = DUMMY.find((p) => {
    return p.id === placeId;
  });
  res.json({ place });
});

module.exports = router;
