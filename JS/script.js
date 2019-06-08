// timer class takes a time in ms
// method .start() -> starts the countdown
// method .

class Timer {

  constructor(timeout_ms) {
    this.remaining = timeout_ms;
    this.isPaused = true;
    console.log('Created timer');
  }
loop() {
  const now = Date.now();
  this.remaining -= now - this.lastTick;
  this.lastTick = now;

  console.log(this.remaining);
  if (this.isPaused) {
    return;
  }
  if(this.isReseted){
    return
  }
  let time = document.getElementById("timer")
  time.innerHTML = Math.floor(this.remaining / 10)
  if (this.remaining <= 0) {
    console.log('Finished');
    window.location.href = "links/explosion.html"
    return;
  }

  // every 10 ms, calls loop
  setTimeout(() => this.loop(), 10);
}

start() {
  if (this.isPaused || this.isReseted) {
    // in case of reset, time remaining 
    if(this.isReseted){
      let time = document.getElementById("time-input")
      this.remaining = time.value
    }
    this.lastTick = Date.now();
    this.isPaused = false;
    this.isReseted = false;
    this.loop();
    console.log('Started');
  } else {
    console.log('Already started');
  }
}

pause() {
  if (!this.isPaused) {
    this.isPaused = true;
    console.log('Paused');
  } else {
    console.log('Already paused');
  }

}
reset(){
  this.isReseted = true
  let time = document.getElementById("timer")
  let timeInput = document.getElementById("time-input")
  time.innerHTML = timeInput.value/10

}
}

class UserI {
  button() {
    let start = document.getElementById("start")
    let stop = document.getElementById("stop")
    let reset = document.getElementById("reset")
    let plus = document.getElementsByClassName("plus")
    let minus = document.getElementsByClassName("minus")
    let timeInput = document.getElementById("time-input")
    let timer = new Timer(10000)
    
    start.addEventListener("click", () => {
        // timer = new Timer(timeInput.value*10)
      
        timer.start()
    })
    stop.addEventListener("click", ()=>{
      timer.pause()
    })
    reset.addEventListener("click", ()=>{
      timer.reset()
      console.log("stopped this shit")
    })
    // })plus.addEventListener("click", ()=>{

    // })minus.addEventListener("click", ()=>{

  }

}
const bomb = {
  started: false,
  paused: false,
  wires: {
    red: [1, "uncut"],
    green: [1, "uncut"],
    blue: [1, "uncut"]
  },

  time: {

  }

}

const date = {

}
// function setTimer(time){
//   bomb.time=time
// }
// function changeTimer(cstime){
//   let seconds = Math.floor(cstime / 1000) % 60 ;
//   let minutes = (Math.floor(cstime / (1000*60)) % 60);
//   let centiseconds = Math.floor(cstime /100)%100
//   return([minutes,seconds,centiseconds])
// }
// function startBomb (){
//   for (let i =0; i <(bomb.time);i++){
//     setTimeout(changeTimer(i),i)
//   }
// }

// const now = new Date();
// console.log(`${now.getMinutes()}:${now.getSeconds()}: ${Math.floor(now.getMilliseconds()/10)}`)


// setInterval(() => {
//   const now = new Date();

//   timer.innerHTML = (`${now.getMinutes()}:${now.getSeconds()}: ${Math.floor(now.getMilliseconds()/10)}`)
// }, 10);

const UI = new UserI
UI.button()
