const express = require('express');
const ejs = require('ejs');
const path = require('path');
require('./db/mongoose')
const mongoose = require('mongoose')
const Labels = require('./models/labels')
const Images = require('./models/images')
const crpyto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const canvas = require('canvas')
const faceapi = require('face-api.js')
var fs = require('fs')
var http = require('http'),
    fs = require('fs'),
    url = require('url');
    imageDir = '/Users/sherwyndsouza/Downloads/';
const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.set('view engine', 'ejs');
let count = 999

app.use(methodOverride('_method'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views',viewsPath)
app.use(express.static(path.join(__dirname,'../public')))

let img_ids = []
let draw_img_vecs = []
let images

const multerConfig = {
    
    storage: multer.diskStorage({
     //Setup where the user's file will go
     destination: function(req, file, next){
       next(null, './public');
       },   
        
        //Then give the file a unique name
        filename: function(req, file, next){
            console.log(file);
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.'+ext);
          }
        }),   
        
        //A means of ensuring only images are uploaded. 
        fileFilter: function(req, file, next){
              if(!file){
                next();
              }
            const image = file.mimetype.startsWith('image/');
            if(image){
              console.log('photo uploaded');
              next(null, true);
            }else{
              console.log("file not supported");
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
      };

      app.get('/uploads', function(req, res){
        res.render('uploads');
    });
    //Route 2: serve up the file handling solution (it really needs a better user response solution. If you try uploading anything but an image it will still say 'complete' though won't actually upload it. Stay tuned for a better solution, or even better, build your own fork/clone and pull request it back to me so we can make this thing better together for everyone out there struggling with it. 
    app.post('/upload',multer(multerConfig).single('photo'),function(req,res){
       res.send('Complete!');
    });

app.get('/predict', (req, res) => {
    res.render('predict',{
    });
});

app.post('/imgs', async (req, res) => {
    a = await req.body.images.feature_list;
    tags = await req.body.tags_data.tags;

    console.log(tags)
    
    images = new Images({
        image_id: count+1,
        img: a,
        Arched_Eyebrows:tags[0],
        Bags_Under_Eyes:tags[1],
        Bald:tags[2],
        Bangs:tags[3],
        Big_Lips:tags[4],
        Big_Nose:tags[5],
        Black_Hair:tags[6],
        Blond_Hair:tags[7],
        Brown_Hair:tags[8],
        Bushy_Eyebrows:tags[9],
        Chubby:tags[10],
        Double_Chin:tags[11],
        Eyeglasses:tags[12],
        Goatee:tags[13],
        Gray_Hair:tags[14],
        High_Cheekbones:tags[15],
        Male:tags[16],
        Mustache:tags[17],
        Narrow_Eyes:tags[18],
        No_Beard:tags[19],
        Oval_Face:tags[20],
        Pale_Skin:tags[21],
        Pointy_Nose:tags[22],
        Receding_Hairline:tags[23],
        Sideburns:tags[24],
        Straight_Hair:tags[25],
        Wavy_Hair:tags[26],
        Young:tags[27]        
    })

    images.save().then(() => {
        count = count + 1
        res.send(images)
    }).catch((error) =>{
        console.log("error",error.message)
        res.status(400).send(error.message)
    })

});

app.post('/attrbs', async (req, res) => {
    img_ids = []
    draw_img_vecs = []

    a = await req.body.data.feature_list;
    obj = {}
    
    ret_obj ={}    

    for(i = 0 ; i < a.length ; i++){
        obj[a[i]] = 1;
    }

    console.log(obj)

    Labels.find(obj).then((labels)=>{ 
        console.log(labels.length)
        if(labels.length == 0){
            return res.send(true)
        }else{
            for(i=0;i<labels.length;i++){
                img_ids.push(labels[i].image_id)
            }

        } 
    }).catch((e)=>{
        console.log(e)
        res.status(500).send()
    })

    Images.find(obj).then((imgs_db)=>{ 
        console.log('new',imgs_db.length)
        if(imgs_db.length == 0){
            console.log('not there')
        }else{
            for(i=0;i<imgs_db.length;i++){
                console.log(imgs_db[i].image_id)
                draw_img_vecs.push(imgs_db[i].img)
            }
            console.log(draw_img_vecs)
            //res.send(draw_img_vecs)
            ret_obj = {
                draw_img_vecs,img_ids
            }
            res.send(ret_obj)

        } 
    }).catch((e)=>{
        console.log(e)
        res.status(500).send()
    })
});

app.get('/', (req, res) => {
    res.render('router', {
    });
});

app.get('/video', (req, res) => {
    res.render('video',{
    });
});

app.get('/home', (req, res) => {
    res.render('home',{
    });
});

app.get('/face', (req, res) => {
    res.render('face',{
    });
});

app.get('/pix2pix', (req, res) => {
    res.render('pix2pix',{
    });
});

app.listen(port, () => {
    console.log("Server is up on port "+port)
});