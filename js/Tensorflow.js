let featureExtractor;
let classifier;
let video;
let loss;
let banana1Images = 0;
let banana2Images = 0;
let banana3Images = 0;
let appleImages = 0;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create a new classifier using those features and give the video we want to use
  classifier = featureExtractor.classification(video, videoReady);
  // Create the UI buttons
  setupButtons();
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady () {
  select('#videoStatus').html('Video ready!');
}


// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {
	
	/**
	classifier.addImage('classifier/banana1/img', 'banana1');
	select('#amountOfBanana1Images').html(banana1Images++);
	**/
	
	classifier.addImage('image/banana2/15.jpeg', 'banana2');
	select('#amountOfBanana2Images').html(banana2Images++);
	
	/**
	classifier.addImage('image/banana3/img', 'banana3');
	select('#amountOfBanana3Images').html(banana3Images++);
	
	classifier.addImage('image/apple/img', 'apple');
	select('#amountOfAppleImages').html(AppleImages++);
	
	**/

  // Train Button
  train = select('#train');
	classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}

// Show the results
function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  classify();
}