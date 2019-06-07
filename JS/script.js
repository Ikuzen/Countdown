const bomb ={
  started:false,
  paused:false,
  wires:{
    red:[1,"uncut"],
    green:[1,"uncut"],
    blue:[1,"uncut"]
  },

  time:{
    min:0,
    sec:0,
    cs:0,
  }

}
function setTimer(time){
  bomb.time.min = time[0]
  bomb.time.sec = time[1]
  bomb.time.cs = time[2]
}
function changeTimer(cstime){
  let seconds = (cstime / 1000) % 60 ;
  let minutes = ((cstime / (1000*60)) % 60);
  let centiseconds = cstime - (seconds+minutes) 
  return([minutes,seconds,centiseconds])
}
function startBomb (){
  for (let i =0; i <(bomb.time.min*60000+bomb.time.sec*1000+bomb.time.cs*10);i++){
    setTimeout(changeTimer(i),i)
  }
}

console.log(changeTimer(1500))