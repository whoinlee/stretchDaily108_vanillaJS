const musicContainer = document.getElementById('music-container');
//
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
//
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');


playBtn.addEventListener('click', () => {
	if (musicContainer.classList.contains('play')) pauseSong()
  	else playSong();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
// audio.addEventListener('timeupdate', updateDurationTime);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);


//-- Song titles
const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 1;
loadSong(songs[songIndex]);

//-- load
function loadSong(song) {
  title.innerText = song;
  audio.src = `sound/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
};
//-- play  '>'
function playSong() {
  musicContainer.classList.add('play');
  //-- icon change
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
};
//-- pause '||'
function pauseSong() {
  musicContainer.classList.remove('play');
  //-- icon change
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
};
//-- moveTo the Prev '<<'
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};
//-- moveTo the Next '>>'
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// const currTime = document.getElementById('currTime');
// const durTime = document.getElementById('durTime');
//-- update duration & currentTime
function updateDurationTime (e) {
// 	// console.log("e.target::", e.target); //== e.srcElement
// 	// console.log("e.srcElement::", e.srcElement);
// 	//***********/
// 	const {duration,currentTime} = e.target;	//in secs
// 	//***********/
// 	// console.log("duration::", duration);
// 	// console.log("currentTime::", currentTime);

// 	let sec;
// 	let sec_d;
// 	let min;
// 	let min_d;

// 	//-- define currentTime in mins
// 	min = (currentTime)?  Math.floor(currentTime/60) : 0;
// 	min = min <10 ? '0'+min : min;
// 	//-- define currentTime in secs
// 	if(Math.floor(currentTime) >= 60){
		
// 		for (var i = 1; i<=60; i++){
// 			if(Math.floor(currentTime)>=(60*i) && Math.floor(currentTime)<(60*(i+1))) {
// 				sec = Math.floor(currentTime) - (60*i);
// 				sec = sec <10 ? '0'+sec:sec;
// 			}
// 		}
// 	}else{
// 		sec = Math.floor(currentTime);
// 		sec = sec <10 ? '0'+sec:sec;
// 	}

// 	if (currTime) currTime.innerHTML = min +':'+ sec;

// 	//-- define duration in min
// 	min_d = (isNaN(duration) === true)? '0': Math.floor(duration/60);
// 	min_d = min_d <10 ? '0'+min_d:min_d;
// 	//-- define duration in sec
// 	if(Math.floor(duration) >= 60){
// 		for (var i = 1; i<=60; i++){
// 			if(Math.floor(duration)>=(60*i) && Math.floor(duration)<(60*(i+1))) {
// 				sec_d = Math.floor(duration) - (60*i);
// 				sec_d = sec_d <10 ? '0'+sec_d:sec_d;
// 			}
// 		}
// 	}else{
// 		sec_d = (isNaN(duration) === true)? '0':
// 		Math.floor(duration);
// 		sec_d = sec_d <10 ? '0'+sec_d:sec_d;
// 	}

// 	if (durTime) durTime.innerHTML = min_d +':'+ sec_d;
		
};

//-- Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement; //******/
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
};
function setProgress(e) {
  const width = this.clientWidth;	//****/
  const clickX = e.offsetX;			//****/
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

