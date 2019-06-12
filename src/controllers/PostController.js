const Post = require('../Models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


module.exports = {
    // retorna todos os posts ordenados pela data de criação de forma descrescente 
    async index(rec, res){
        const posts = await Post.find().sort('-createdAt');
        
        //retorna em formato de json
        return res.json(posts);
    },

    async store(req,res){
        // método store recebe os dados do arquivo e dados do post 
        const { author, place, description, hashtags } = req.body;
        const { filename : image } = req.file;

        //"converte" para jpg
        const[name] = image.split('.');
        const fileName = `${name}.jpg`;
        
        // redimensiona a imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName )
            )
        
        // deleta o arquivo original
        fs.unlinkSync(req.file.path);
        
        // salvamento dentro do banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        // envia informação em tempo real de uma informação post com todos os dados do post
        req.io.emit('post', post);
        
        return res.json(post);
    }
};