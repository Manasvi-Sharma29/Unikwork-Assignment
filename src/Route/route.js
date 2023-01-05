const express = require("express");
const router = express.Router();
const{ createUser } = require('../Controller/user')

router.post('/register',createUser)