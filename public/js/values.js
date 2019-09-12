
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


var checkboxesChecked = [];
var names = [];

let new_img = []
let draw_imgs = []
var obj
var count

function sendtoDb(){
    canvas0.getContext('2d').clearRect(0,0,canvas0.width,canvas0.height)
    canvas1.getContext('2d').clearRect(0,0,canvas1.width,canvas1.height)
    canvas2.getContext('2d').clearRect(0,0,canvas2.width,canvas2.height)
    canvas3.getContext('2d').clearRect(0,0,canvas3.width,canvas3.height)
    count = 0
    new_img = []
    draw_imgs = []
    console.log(names)
    for(i=0;i<names.length;i++){
        console.log(names[i])
    }

    let features = {
        feature_list: names
      };
    axios.post('/attrbs', {
        data: features
    }).then(function (response) {
        // console.log(typeof(response.data))
        // console.log(response.data)
        // new_img = JSON.parse(JSON.stringify(response.data))
        // console.log('IN NEW',new_img)
        // var obj = response.data
        // var values = Object.keys(obj).map(function (key) { return obj[key]; });
        // //console.log('Values',values)
        //console.log(typeof(values))
        
        console.log(response.data)
        for(i=0;i<response.data.img_ids.length;i++){
            new_img[i] = response.data.img_ids[i]
        }
        getFromStorage()

        for(i=0;i<response.data.draw_img_vecs.length;i++){
            draw_imgs[i] = response.data.draw_img_vecs[i]
            drawCanvas(draw_imgs[i])
        }

        // var values = Object.keys(obj).map(function (key) { return obj[key]; });
        //console.log('Values',values)
        // console.log('Values',values)
        // console.log("DA",new_img[0]);
        //drawCanvas()
    }).catch(function (error) {
        console.log(error);
    });
}

function drawCanvas(objs){
    console.log('in draw')
    canvas0 = document.getElementById('canvas0');
    canvas1 = document.getElementById('canvas1');
    canvas2 = document.getElementById('canvas2');
    canvas3 = document.getElementById('canvas3');

    //console.log('NEW_IMG',new_img[0].img)
    //var json = `{ "foo": 1, "bar": 2, "baz": 3 }`;
    // var obj = new_img[0].img;
    console.log('obj',objs)
    var values = Object.keys(objs).map(function (key) { return objs[key]; });
    console.log('here',values);
    let img_ten = tf.tensor3d(values, [218, 178, 3], 'int32').resizeNearestNeighbor([100,100])
    console.log('imgten',img_ten)
    if(count == 0){
        tf.browser.toPixels(img_ten, canvas0);    

    }else if(count == 1){
        tf.browser.toPixels(img_ten, canvas1);    

    }else if(count == 2){
        tf.browser.toPixels(img_ten, canvas2);    

    }else if(count == 3){
        tf.browser.toPixels(img_ten, canvas3);    

    }else if(count == 4){
        tf.browser.toPixels(img_ten, canvas4);    
    }
    count = count+1;
}

function getFromStorage(){
    document.getElementById("myImg0").src = './test/'+new_img[0]
    document.getElementById("myImg1").src = './test/'+new_img[1]
    document.getElementById("myImg2").src = './test/'+new_img[2]
    document.getElementById("myImg3").src = './test/'+new_img[3]
}

function update(){
    names = []
    console.log('In update')
    for(i=0;i<checkboxesChecked.length;i++){
        if(checkboxesChecked[i].value == 'label0'){
            label0 = 1
            names.push('Arched_Eyebrows')
        }
        if(checkboxesChecked[i].value == 'label1'){
            label1 = 1
            names.push('Bags_Under_Eyes')
        }
        if(checkboxesChecked[i].value == 'label2'){
            label2 = 1
            names.push('Bald')
        }
        if(checkboxesChecked[i].value == 'label3'){
            label3 = 1
            names.push('Bangs')
        }
        if(checkboxesChecked[i].value == 'label4'){
            label4 = 1
            names.push('Big_Lips')
        }
        if(checkboxesChecked[i].value == 'label5'){
            label5 = 1
            names.push('Big_Nose')
        }
        if(checkboxesChecked[i].value == 'label6'){
            label6 = 1
            names.push('Black_Hair')
        }
        if(checkboxesChecked[i].value == 'label7'){
            label7 = 1
            names.push('Blond_Hair')
        }
        if(checkboxesChecked[i].value == 'label8'){
            label8 = 1
            names.push('Brown_Hair')
        }
        if(checkboxesChecked[i].value == 'label9'){
            label9 = 1
            names.push('Bushy_Eyebrows')
        }
        if(checkboxesChecked[i].value == 'label10'){
            label10 = 1
            names.push('Chubby')
        }
        if(checkboxesChecked[i].value == 'label11'){
            label11 = 1
            names.push('Double_Chin')
        }
        if(checkboxesChecked[i].value == 'label12'){
            label12 = 1
            names.push('Eyeglasses')
        }
        if(checkboxesChecked[i].value == 'label13'){
            label13 = 1
            names.push('Goatee')
        }
        if(checkboxesChecked[i].value == 'label14'){
            label14 = 1
            names.push('Gray_Hair')
        }
        if(checkboxesChecked[i].value == 'label15'){
            label15 = 1
            names.push('High_Cheekbones')
        }
        if(checkboxesChecked[i].value == 'label16'){
            label16 = 1
            names.push('Male')
        }
        if(checkboxesChecked[i].value == 'label17'){
            label17 = 1
            names.push('Mustache')
        }
        if(checkboxesChecked[i].value == 'label18'){
            label18 = 1
            names.push('Narrow_Eyes')
        }
        if(checkboxesChecked[i].value == 'label19'){
            label19 = 1
            names.push('No_Beard')
        }
        if(checkboxesChecked[i].value == 'label20'){
            label20 = 1
            names.push('Oval_Face')
        }
        if(checkboxesChecked[i].value == 'label21'){
            label21 = 1
            names.push('Pale_Skin')
        }
        if(checkboxesChecked[i].value == 'label22'){
            label22 = 1
            names.push('Pointy_Nose')
        }
        if(checkboxesChecked[i].value == 'label23'){
            label23 = 1
            names.push('Receding_Hairline')
        }
        if(checkboxesChecked[i].value == 'label24'){
            label24 = 1
            names.push('Sideburns')
        }
        if(checkboxesChecked[i].value == 'label25'){
            label25 = 1
            names.push('Straight_Hair')
        }
        if(checkboxesChecked[i].value == 'label26'){
            label26 = 1
            names.push('Wavy_Hair')
        }
        if(checkboxesChecked[i].value == 'label27'){
            label27 = 1
            names.push('Young')
        }
    }

    sendtoDb()

}


function getValues() {
    names = []
    checkboxesChecked = []
    var checkboxes = document.getElementsByName('chkboxName');
    console.log(checkboxes.length)
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i]);
        }
    }
    for(i =0 ; i<checkboxesChecked.length;i++){
        console.log(checkboxesChecked[i].value)
    }
    update()
}