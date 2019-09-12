let model; let video; let resultsP; let counter = 0;

async function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  resultsP = createP('Loading model and video...');
  model = await tf.loadLayersModel('./tfjs_model_3/model.json');
  console.log("Model Loaded", model);
}

function draw(){
  if(counter % 1000 == 0){
    getPrediction();
  }
  counter += 1;
}

async function getPrediction(){
  const videoElement = document.createElement('video');
  videoElement.width = 178;
  videoElement.height = 218;
  const cam = await tf.data.webcam(videoElement);
  const img = await cam.capture();
  cam.stop();
  values = tf.tidy(() => {
    let X = img.as4D(1, 218, 178, 3);
    X = X.div(tf.scalar(255));
    let predictions = model.predict(X).round().dataSync();
    return predictions;
  });
  tf.dispose(img);
  names = getNames(values);
  resultsP.html(names);
}

function getNames(values){
  names = []
  if(values[0] == 1){
    names.push('Arched Eyebrows')
  }
 if(values[1] == 1){
    names.push('Bags Under Eyes')
  }
 if(values[2] == 1){
    names.push('Bald')
  }
 if(values[3] == 1){
    names.push('Bangs')
  }
 if(values[4] == 1){
    names.push('Big Lips')
  }
 if(values[5] == 1){
    names.push('Big Nose')
  }
 if(values[6] == 1){
    names.push('Black Hair')
  }
 if(values[7] == 1){
    names.push('Blond Hair')
  }
 if(values[8] == 1){
    names.push('Brown Hair')
  }
 if(values[9] == 1){
    names.push('Bushy Eyebrows')
  }
 if(values[10] == 1){
    names.push('Chubby')
  }
 if(values[11] == 1){
    names.push('Double Chin')
  }
 if(values[12] == 1){
    names.push('Eyeglasses')
  }
 if(values[13] == 1){
    names.push('Goatee')
  }
 if(values[14] == 1){
    names.push('Gray Hair')
  }
 if(values[15] == 1){
    names.push('High Cheekbones')
  }
 if(values[16] == 1){
    names.push('Male')
  }
  else{
    names.push('Female')
  }
 if(values[17] == 1){
    names.push('Mustache')
  }
 if(values[18] == 1){
    names.push('Narrow Eyes')
  }
 if(values[19] == 1){
    names.push('No Beard')
  }
  else{
    names.push('Beard')
  }
 if(values[20] == 1){
    names.push('Oval Face')
  }
 if(values[21] == 1){
    names.push('Pale Skin')
  }
 if(values[22] == 1){
    names.push('Pointy Nose')
  }
 if(values[23] == 1){
    names.push('Receding Hairline')
  }
 if(values[24] == 1){
    names.push('Sideburns')
  }
 if(values[25] == 1){
    names.push('Straight Hair')
  }
 if(values[26] == 1){
    names.push('Wavy Hair')
  }
 if(values[27] == 1){
    names.push('Young')
 }
 return names
}