const photo = document.getElementById("photo");

const mouthClosed = "images/lgxbot1.png";
const mouthOpenImages = [
  "images/lgxbot1.png",
  "images/lgxbot2.png",
  "images/lgxbot3.png",
  "images/lgxbot4.png"
];

const sounds = [
  "VO/VO1.mp3",
  "VO/VO2.mp3",
  "VO/VO3.mp3",
  "VO/VO4.mp3",
  "VO/VO5.mp3",
  "VO/VO6.mp3",
  "VO/VO7.mp3",
  "VO/VO8.mp3",
  "VO/VO9.mp3",
  "VO/VO10.mp3",
  "VO/VO11.mp3",
  "VO/VO12.mp3",
  "VO/VO13.mp3",
  "VO/VO14.mp3",
  "VO/VO15.mp3",
  "VO/VO16.mp3",
  "VO/VO17.mp3",
];

const audioCache = sounds.map(src => {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
});

let isTalking = false;
let mouthTimer = null;
let currentAudio = null;

photo.addEventListener("click", () => {
  if (isTalking) return; 
  
  isTalking = true;
  
  const randomIndex = Math.floor(Math.random() * audioCache.length);
  currentAudio = audioCache[randomIndex];
  
  currentAudio.currentTime = 0;
  
  mouthTimer = setInterval(() => {
    const randomMouth = mouthOpenImages[Math.floor(Math.random() * mouthOpenImages.length)];
    photo.src = randomMouth;
  }, 300); 
  
  currentAudio.play().catch(err => {
    console.error("Audio playback failed:", err);
    stopTalking();
  });
  
  const onAudioEnd = () => {
    stopTalking();
    currentAudio.removeEventListener("ended", onAudioEnd);
    currentAudio.removeEventListener("error", onAudioError);
  };
  
  const onAudioError = (err) => {
    console.error("Audio error:", err);
    stopTalking();
    currentAudio.removeEventListener("ended", onAudioEnd);
    currentAudio.removeEventListener("error", onAudioError);
  };
  
  currentAudio.addEventListener("ended", onAudioEnd);
  currentAudio.addEventListener("error", onAudioError);
});

function stopTalking() {
  clearInterval(mouthTimer);
  mouthTimer = null;
  photo.src = mouthClosed;
  isTalking = false;
  
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}