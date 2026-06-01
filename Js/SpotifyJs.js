console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let playD = document.getElementById('playDuration');
let progressPlay = 0;

let songs = [
  { songName: "Bholi Si Surat", filePath: "song/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Dekhne walon ne", filePath: "song/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Kitna Pyaara Tujhe", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Ladki Badi Anjani Hai", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Love You Zindagi", filePath: "song/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Neele Neele Ambar Par", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "O Jaana", filePath: "song/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Tu Jo Has Has Ke Sanam", filePath: "song/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Tumse Milne Ko Dil", filePath: "song/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Yeh Pyar Kaise Hota Hai", filePath: "song/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    updatePlayPauseIcons(true, songIndex);
  } else {
    audioElement.pause();
    updatePlayPauseIcons(false, songIndex);
  }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
  // Update Seekbar
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 258);
  myProgressBar.value = progress;

  // Update Play Duration
  progressPlay = parseInt(audioElement.currentTime);
  playD.innerText = formatTime(progressPlay);
});

// Listen for song end
audioElement.addEventListener('ended', () => {
  playNextSong();
  updateSongItemPlayIcons(songIndex);
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration /258;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};

const updatePlayPauseIcons = (isPlaying, index) => {
  if (isPlaying) {
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    document.getElementById(index).classList.remove('fa-play-circle');
    document.getElementById(index).classList.add('fa-pause-circle');
  } else {
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    document.getElementById(index).classList.remove('fa-pause-circle');
    document.getElementById(index).classList.add('fa-play-circle');
  }
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    let clickedIndex = parseInt(e.target.id);

    if (clickedIndex === songIndex && !audioElement.paused) {
      audioElement.pause();
      updatePlayPauseIcons(false, clickedIndex);
    } else {
      makeAllPlays();
      songIndex = clickedIndex;
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      updatePlayPauseIcons(true, songIndex);
      updateSongItemPlayIcons(songIndex);
    }
  });
});

document.getElementById('next').addEventListener('click', () => {
  playNextSong();
  updateSongItemPlayIcons(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
  playPreviousSong();
  updateSongItemPlayIcons(songIndex);
});

function playNextSong() {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  updatePlayPauseIcons(true, songIndex);
}

function playPreviousSong() {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  updatePlayPauseIcons(true, songIndex);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updateSongItemPlayIcons(currentIndex) {
  makeAllPlays();
  document.getElementById(currentIndex).classList.remove('fa-play-circle');
  document.getElementById(currentIndex).classList.add('fa-pause-circle');
}
