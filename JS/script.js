///////////
/// The timer class will take the elements of the time input (from the user), and from the time div (which displays the time remaining on the bomb)
/// it has :
/// **loop method ** which calls itself and updates the time remaining until it reaches zero, or is paused/reseted
/// **start method ** will call the loop method for the first time, and will initialize the conditions if game was reseted
/// ** pause method ** will set isPaused to true, stopping the loop method and freezing the timer
/// **reset method** will set isReseted to true, stopping the loop, and making start method initialize .
//////////
class Timer {

  constructor(time, timeInput) {
    this.timediv = time
    this.timeinput = timeInput
    this.isPaused = true;
    this.isReseted = true;
    this.tickAudio = document.getElementById("tic")
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
    
    // makes a tick sounds when a second ends
    if (centisecString == 0){
      this.tickAudio.play()
      setTimeout(()=>{this.tickAudio.pause()
      this.tickAudio.currentTime=0},100)
    }
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


//////////
/// The class wires will take the elements from the wires input, and from the wires image elements to modify them
/// It'll inject the winning and losing conditions of the game.
///**update method ** displays or hides the wires div, depending of user input
///**cutWire method ** changes the image of the wires that are cut. Determines if the player wins or loses if the good/bad wires are cut
///**wireSetting ** randomly injects true to one of the wires win/losing contition
/////////
class Wires {
  constructor(wire_elements, wire_count) {
    this.allWires = wire_elements
    this.newWireCount = wire_count.value
    this.cutAudio = document.getElementById("cut")

    // array object that initializes the infos on each wire
    this.wireStates = [
      {
        cut: false,
        defusing: false,
        explosive: false,
      }, {
        cut: false,
        defusing: false,
        explosive: false,
      }, {
        cut: false,
        defusing: false,
        explosive: false,
      }, {
        cut: false,
        defusing: false,
        explosive: false,
      }, {
        cut: false,
        defusing: false,
        explosive: false,
      }, {
        cut: false,
        defusing: false,
        explosive: false,
      }, {
        cut: false,
        defusing: false,
        explosive: false,
      }, {
        cut: false,
        defusing: false,
        explosive: false,
      },]
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
    for (let i = 0; i < this.newWireCount; i++) {
      // will change the image of the wire when cut
      this.allWires[i].addEventListener("click", () => {
        this.cutAudio.play()
        //if red wire
        if (i == 0 || i == 3 || i == 4 || i == 7) {
          this.allWires[i].src = "Assets/redcutwire.png"
          console.log("cut")
        }
        //if green wire
        else if (i == 1 || i == 5) {
          this.allWires[i].src = "Assets/greencutwire.png"
          console.log("cut")

        }
        //if blue wire
        else if (i == 2 || i == 6) {
          this.allWires[i].src = "Assets/bluecutwire.png"
          console.log("cut")

        }
        //checks if it's the explosive wire, if true sends immediately to game over page
        if (this.wireStates[i].explosive === true) {
          window.location.href = "links/explosion.html"
        }
        //also checks if the good wire was cut
        if (this.wireStates[i].defusing === true) {
          window.location.href = "links/defused.html"
        }

      })

    }
  }

  // sets the exploding/difusing wires, randomly depending of number of wires
  wireSetting() {
    // selects randomly one of the active wires (from 0 to the number of wires), and sets its property to "explosive"
    let explodingWireIndex = Math.floor(Math.random() * parseInt(this.newWireCount))

    this.wireStates[explodingWireIndex].explosive = true

    let winningWireIndex = Math.floor(Math.random() * parseInt(this.newWireCount))
    // in case random chooses the same index for both winning and losing > adds +/- to the index
    if (winningWireIndex == explodingWireIndex && winningWireIndex < this.newWireCount - 1) {
      winningWireIndex++
    }
    else if (winningWireIndex == explodingWireIndex && winningWireIndex > this.newWireCount - 1) {
      winningWireIndex--
    }
    this.wireStates[winningWireIndex].defusing = true
  }
}

////////
// Class User I -> injects all the events on the buttons in the interface.
// Uses both the class Timer and class Wires as active parameters
///////
class UserI {
  button() {
    let start = document.getElementById("start")
    let stop = document.getElementById("stop")
    let reset = document.getElementById("reset")
    let plus = document.getElementsByClassName("plus")
    let minus = document.getElementsByClassName("minus")
    let timeDiv = document.getElementById("timer")
    let timeInput = document.getElementById("time-input")
    let wireCount = document.getElementById("wire-count")

    // Timer needs the elements of the seconds input, and the timer div.
    let timer = new Timer(timeDiv, timeInput)

    start.addEventListener("click", () => {

      // case if click on start for the first time > initialize wires
      if (timer.isReseted) {
        let wires = document.getElementsByClassName("wires")
        let wires_ = new Wires(wires, wireCount)
        wires_.update()
        wires_.cutWire()
        wires_.wireSetting()
      }
      timer.start()

    })
    stop.addEventListener("click", () => {
      timer.pause()
    })
    reset.addEventListener("click", () => {
      timer.reset()
      console.log("stopped this shit")
      let wires = document.getElementsByClassName("wires")
      let wireCount = document.getElementById("wire-count")
      let wires_ = new Wires(wires, wireCount)
      wires_.update()
      wires_.cutWire()
      // resets all wires image
      for (let i = 0; i < wires.length; i++) {
        // if red wires
        if (i == 0 || i == 3 || i == 4 || i == 7) {
          wires[i].src = "Assets/redwire.png"
        }
        //if green wire
        else if (i == 1 || i == 5) {
          wires[i].src = "Assets/greenwire.png"

        }
        //if blue wire
        else if (i == 2 || i == 6) {
          wires[i].src = "Assets/bluewire.png"

        }
      }
    })
    plus[0].addEventListener("click", () => {
      if (timeInput.value < 180) {
        timeInput.value++
      }
    })

    minus[0].addEventListener("click", () => {
      if (timeInput.value > 0) {
        timeInput.value--
      }
    })

    plus[1].addEventListener("click", () => {
      if (wireCount.value < 8) {
        wireCount.value++
      }
    })
    minus[1].addEventListener("click", () => {
      if (wireCount.value > 2) {
        wireCount.value--
      }
    })
  }

}


// initialization


const UI = new UserI
UI.button()
