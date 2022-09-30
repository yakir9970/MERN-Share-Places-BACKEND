const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const DUMMY = [
  {
    id: "u1",
    name: "max",
    email: "test@test.com",
    password: "testers",
  },
  {
    id: "u2",
    name: "maxy",
    email: "test2@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Input!", 422));
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY.find((u) => u.email === email);

  if (hasUser) {
    return next(new HttpError("User Already Exists!", 422));
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Email or Password is Incorrect!", 404));
  }

  res.json({ message: "Logged In!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
