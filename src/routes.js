const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload'); 

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

// retorna todos posts do nosso feed
routes.get('/posts', PostController.index);

// essa configuração do multer permite que o express entenda o corpo que enviamos através do imsonia no formato multipart
routes.post('/posts', upload.single('image'), PostController.store);

// permite realizar os likes
routes.post('/posts/:id/like',  LikeController.store);


module.exports = routes;