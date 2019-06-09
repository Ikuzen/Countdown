
class Timer {

  constructor(time, timeInput) {
    this.timediv = time
    this.timeinput = timeInput
    this.isPaused = true;
    this.isReseted = true;
    console.log('Created timer');

  }
  loop() {
    const now = Date.now();
    this.remaining -= now - this.lastTick;
    this.lastTick = now;

    // console.log(this.remaining);
    if (this.isPaused) {
      return;
    }
    if (this.isReseted) {
      return
    }

    // converts the given time in ms to /minutes/secondes/centiseconds/  //
    const now2 = new Date(this.remaining);

    const minuteString = now2.getMinutes().toString().padStart(2, '0');
    const secondString = now2.getSeconds().toString().padStart(2, '0')
    const centisecString = Math.floor(now2.getMilliseconds() / 10).toString().padStart(2, '0')

    this.timediv.innerHTML = `${minuteString}:${secondString}:${centisecString}`
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
      if (this.isReseted) {
        this.remaining = this.timeinput.value * 1000
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
  reset() {
    this.isReseted = true
    this.timediv.innerHTML = "00:00:00"

  }
}
class Wires {
  constructor(wire_elements, wire_count) {
    this.allWires = wire_elements
    this.newWireCount = wire_count.value

  }
  // update will add/removes wires 
  update() {
    // will make as many elements as there are wires visible
    console.log(this.allWires[3])
    for (let i = 0; i < this.newWireCount; i++) {
      this.allWires[i].removeAttribute("style")
    }
    // if number of wires selected inferior to the max, non selected wires becomes invisible
    if (this.newWireCount > 0) {
      for (let i = 0; i < 8 - parseInt(this.newWireCount); i++) {
        this.allWires[7 - i].style = "display:none"
      }
    }
  }
  cutWire() {
    console.log("were in")
    for (let i = 0; i < this.newWireCount; i++) {
      console.log("hey")
      console.log(this.allWires[i].src)
      this.allWires[i].addEventListener("click", () => {
        this.allWires[i].src = "Assets/redcutwire.png"
        console.log("cut")
      })
    }
  }
  wireSetting() {

  }
}


class UserI {
  button() {
    let start = document.getElementById("start")
    let stop = document.getElementById("stop")
    let reset = document.getElementById("reset")
    let plus = document.getElementsByClassName("plus")
    let minus = document.getElementsByClassName("minus")
    let timeDiv = document.getElementById("timer")
    let timeInput = document.getElementById("time-input")

    // Timer needs the elements of the seconds input, and the timer div.
    let timer = new Timer(timeDiv, timeInput)

    start.addEventListener("click", () => {
      // the wires input element has to be redefined each time start is pushed
      console.log(timer.isReseted)
      if(timer.isReseted)
      {
        let wires = document.getElementsByClassName("wires")
        let wireCount = document.getElementById("wire-count")
        let wires_ = new Wires(wires, wireCount)
        wires_.update()
        wires_.cutWire()
      }
      timer.start()

    })
    stop.addEventListener("click", () => {
      timer.pause()
    })
    reset.addEventListener("click", () => {
      timer.reset()
      console.log("stopped this shit")
    })
    // })plus.addEventListener("click", ()=>{

    // })minus.addEventListener("click", ()=>{

  }

}


// initialization


const UI = new UserI
UI.button()
