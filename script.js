
let currentSongIndex =0;
const  audio = document.getElementById("audio");
const playBtn =document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const volumeSlider = document.getElementById("volumeSlider");
const songItems = document.querySelectorAll(".songItem");
const songInfo = document.querySelector(".songinfo");
const seekbar =document.querySelector(".seekbar");
const circle = document.querySelector(".circle");
const playButton = document.getElementById("playButton");

let song = [];

songItems.forEach((item, index) => {
    const src = item.getAttribute("data-src");
    const title = item.textContent.trim();
    song.push({src, title});

    item.addEventListener("click" , () => {
     currentSongIndex =index;
     playSong();
    })

const playButton = item.querySelector("button");
if (playButton){
    playButton.addEventListener("click" , (e) => {
        e.stopPropagation();
        currentSongIndex = index;
        playSong();
    }) 

    }


});



function playSong(){
    const currentSong  =song[currentSongIndex];
    audio.src = currentSong.src;
    audio.play();
    updatePlayIcon(true);
    updateSongInfo(currentSong.title); 

}

function updatePlayIcon(isPlaying){
    if (isPlaying) {
  playIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;

      } else {
        playIcon.innerHTML =`<path d="M8 5v14l11-7z"/>`; 
}
  }
        function updatSongInfo(title){
            if(songInfo) {
                songInfo.innerText = title;
            }

        }

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play ();
        updatePlayIcon(true);

    } else{
        audio.pause();
        updatePlayIcon(false);
    }
});

prevBtn.addEventListener("click", () =>{
    currentSongIndex = (currentSongIndex - 1+ song.length) % song.length;
    playSong();
});
nextBtn.addEventListener("click",() =>{
currentSongIndex = (currentSongIndex +1 ) % song.length;
playSong();
});

volumeSlider.addEventListener("input" , () =>{
    audio.volume = volumeSlider.value
});
audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % song.length;
    playSong();
});

seekbar.addEventListener("click", (e) => {
    const rect = seekbar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / seekbar.clientWidth;
    audio.currentTime = percent * audio.duration;
});


//  Update Circle on Seekbar with Time
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        circle.style.left = `${progress}%`;
    }
});

seekbar.addEventListener("click", (e) => {
    const rect = seekbar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / seekbar.clientWidth;
    audio.currentTime = percent * audio.duration;
});





function updatePlayIcon(isPlaying) {
  if (isPlaying) {
    playIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
  } else {
    playIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
  }

  // Change play icon in card
  songItems.forEach((item, i) => {
    const svg = item.querySelector("svg");
    const card = item;

    if (i === currentSongIndex) {
      card.classList.add("active");
      if (svg) {
        svg.innerHTML = isPlaying
          ? `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>` // pause
          : `<path d="M8 5v14l11-7z"/>`; // play
      }
    } else {
      card.classList.remove("active");
      if (svg) svg.innerHTML = `<path d="M8 5v14l11-7z"/>`; // reset to play
    }
    
  });
}
