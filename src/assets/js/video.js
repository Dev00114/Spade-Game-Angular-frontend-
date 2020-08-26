function video_test(){
  var video = $('#video_test');
  navigator.mediaDevices.getUserMedia({audio:true,video:true}).then((stream) => {video.srcObject = stream});
}
