setTimeout(()=>{
    let tryAgain = document.getElementsByTagName("a")
    tryAgain[0].removeAttribute("style")
},2000)
sound = document.getElementsByTagName("audio")
console.log(sound)
sound[0].currentTime = 1.5
sound[0].play()