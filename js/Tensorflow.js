let timer = 5
let classifier;
let video;
let isHidden = false;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  if(results[0].className == "Granny Smith" || results[0].className == "pomegranate"){
    select('#result').html('apple')
  }
  else{
  select('#result').html(results[0].className);
  }
  select('#probability').html(Math.round(nf(results[0].probability, 0, 2)*100));
  classifyVideo();
  
}

function hideCam(){
	video.hide();
	isHidden = true;
}

function showCam(){
	//prevent two captures at the same time
	if (isHidden == true){
	video = createCapture(VIDEO);
	} else {
		//nothing
	}
}

