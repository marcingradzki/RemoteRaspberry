var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, 'C:/Users/Marcin/Desktop/JavaScript/uploads/');
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});
//var storage = multer({dest : '../uploads/'});
var upload = multer({storage : storage}).single('userPhoto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cloud', { title: 'OwnCloudJs' });
});

router.post('/api/photo', function(req, res) {
    upload(req, res, function(err) {
        //console.log('przed errorem');
        if(err){
            //throw err;
            return res.end("Error uploading file");
        }
        res.end("File uploaded");
    });
});
