rise_up = "";
faded = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;
song_faded = "";

function preload(){
    rise_up = loadSound("TheFatRat.mp3");
    faded = loadSound("Faded.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(325, 150);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    image(video, 0, 0, 600, 500);

    stroke("#FF0000");
    fill("#FF0000");

    song_faded = faded.isPlaying();
    console.log(song_faded);

    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        rise_up.stop();

        if(song_faded == false){
            faded.play();
        
            document.getElementById("status").innerHTML = "Song Name : Faded";
        }
    }
}


function gotPoses(results){
    if(results.length > 0){
      console.log(results);
      leftWristScore =  results[0].pose.keypoints[9].score;
      console.log("scoreLeftWrist = " + leftWristScore);
      
      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
  
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
    }
}