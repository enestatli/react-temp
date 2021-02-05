/* eslint-disable no-new */
const express = require('express');

const router = express.Router();

const { User } = require('./User');
const { News } = require('./News');
const { Comment } = require('./Comment');

new User(router);
new Comment(router);
new News(router);

module.exports = router;
