const multer = require('multer');
const path = require('path');

//config do multer
module.exports = {
    storage: new multer.diskStorage({
        // configuração do destino dos arquivos
        destination: path.resolve(__dirname,'..', '..', 'uploads'),
        filename: function(req,file,callback){
        // utilização do nome original do arquivo
            callback(null,file.originalname);
        }

    })
}