
var label0 = 0
var label1 = 0
var label2 = 0
var label3 = 0
var label4 = 0
var label5 = 0
var label6 = 0
var label7 = 0
var label8 = 0
var label9 = 0
var label10 = 0
var label11 = 0
var label12 = 0
var label13 = 0
var label14 = 0
var label15 = 0
var label16 = 0
var label17 = 0
var label18 = 0
var label19 = 0
var label20 = 0
var label21 = 0
var label22 = 0
var label23 = 0
var label24 = 0
var label25 = 0
var label26 = 0
var label27 = 0

let model;
console.log('Model Loaded');
window.onload = async function loadModel(){
    console.log("Called model to load");
    model = await tf.loadLayersModel('./tfjs_model/model.json');
    //model = await tf.loadLayersModel('./celeb_model/model.json');
    $('.progress-bar').hide();
    console.log(model);
}
console.log('idk')

let img
let img_arr
let tags

function preprocessImage()
{  
    values = []
    names = []
    console.log(model);
    // predictions =  model.predict(tensor, verbose=true);
    // console.log("Predictions in float: ", predictions.dataSync());
    // console.log("Predictions in int: ", predictions.round().dataSync());
    predictions = tf.tidy(() => {
        // console.log('numTensors (in tidy): ' + tf.memory().numTensors);
        let image= $('#uploadPreview').get(0);
        img = tf.browser.fromPixels(image)
        let tensor=tf.browser.fromPixels(image)
        .resizeNearestNeighbor([218,178])
        .toFloat();
        img_arr = tensor.dataSync();
        console.log(tensor.shape)
        console.log(tensor);
        // console.log(tensor.print())
        tensor = tensor.div(tf.scalar(255));
        // console.log(tensor.print())
        tensor = tensor.as4D(1,218,178,3);
        // console.log(tensor.shape);
        // The value returned inside the tidy function will return
        // through the tidy, in this case to the variable y.
        return model.predict(tensor, verbose=true);
    });
    console.log("Predictions in int: ", predictions.round().dataSync());
    // console.log('numTensors (outside tidy): ' + tf.memory().numTensors);
    console.log(predictions.round().dataSync()[16])

    for (i = 0; i < predictions.round().dataSync().length; i++) {
        values[i] = predictions.round().dataSync()[i];
      }

        console.log(values)
        console.log('VAlues',values[0])
        console.log(typeof(values[0]))
        if(values[0] == 1){
            label0 = 1
            names.push('Arched Eyebrows')
        }
         if(values[1] == 1){
            label1 = 1
            names.push('Bags Under Eyes')
        }
         if(values[2] == 1){
            label2 = 1
            names.push('Bald')
        }
         if(values[3] == 1){
            label3 = 1
            names.push('Bangs')
        }
         if(values[4] == 1){
            label4 = 1
            names.push('Big Lips')
        }
         if(values[5] == 1){
            label5 = 1
            names.push('Big Nose')
        }
         if(values[6] == 1){
            label6 = 1
            names.push('Black Hair')
        }
         if(values[7] == 1){
            label7 = 1
            names.push('Blond Hair')
        }
         if(values[8] == 1){
            label8 = 1
            names.push('Brown Hair')
        }
         if(values[9] == 1){
            label9 = 1
            names.push('Bushy Eyebrows')
        }
         if(values[10] == 1){
            label10 = 1
            names.push('Chubby')
        }
         if(values[11] == 1){
            label11 = 1
            names.push('Double Chin')
        }
         if(values[12] == 1){
            label12 = 1
            names.push('Eyeglasses')
        }
         if(values[13] == 1){
            label13 = 1
            names.push('Goatee')
        }
         if(values[14] == 1){
            label14 = 1
            names.push('Gray Hair')
        }
         if(values[15] == 1){
            label15 = 1
            names.push('High Cheekbones')
        }
         if(values[16] == 1){
            label16 = 1
            names.push('Male')
        }
        else{
            names.push('Female')
        }
         if(values[17] == 1){
            label17 = 1
            names.push('Mustache')
        }
         if(values[18] == 1){
            label18 = 1
            names.push('Narrow Eyes')
        }
         if(values[19] == 1){
            label19 = 1
            names.push('No Beard')
        }
         if(values[20] == 1){
            label20 = 1
            names.push('Oval Face')
        }
         if(values[21] == 1){
            label21 = 1
            names.push('Pale Skin')
        }
         if(values[22] == 1){
            label22 = 1
            names.push('Pointy Nose')
        }
         if(values[23] == 1){
            label23 = 1
            names.push('Receding Hairline')
        }
         if(values[24] == 1){
            label24 = 1
            names.push('Sideburns')
        }
         if(values[25] == 1){
            label25 = 1
            names.push('Straight Hair')
        }
         if(values[26] == 1){
            label26 = 1
            names.push('Wavy Hair')
        }
         if(values[27] == 1){
            label27 = 1
            names.push('Young')
         }
    
    document.getElementById('features').innerHTML = names     
    console.log(names)
    draw()
    saveImage()

}

function saveImage(){
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");
    let image= $('#uploadPreview').get(0);

    imgCanvas.width = image.width;
    imgCanvas.height = image.height;

    // Draw image into canvas element
    imgContext.drawImage(image, 0, 0, image.width, image.height);


    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
        localStorage.setItem("elephant", imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}

function draw(){
    console.log(img_arr)
    img_ten = tf.tensor3d(img_arr, [218, 178, 3]).resizeNearestNeighbor([100,100])
    console.log(img_ten)
    // canvas = document.getElementById('canvas');
    send_img = img_ten.dataSync()
    // tf.browser.toPixels(img_ten, canvas);
    
    console.log('lavbel0',label0)
    tags=[label0,label1,label2,label3,label4,label5,label6,label7,label8,label9,label10,label11,label12,label13,label14,label15,label16,label17,label18,label19,label20,label21,label22,label23,label24,label25,label26,label27]     
    let features = {
        feature_list: img_arr,
      };
    let tags_list = {
        tags
    };
    console.log(tags)

    axios.post('/imgs', {
        images: features,
        tags_data: tags_list
    }).then(function (response) {
        console.log("DDA",response.config);
    }).catch(function (error) {
        console.log(error.data);
    });
}
