var child = document.getElementById("dancing");
var sound = document.getElementsByTagName("audio")
console.log(sound)
var bip = setInterval(()=>{
  sound[1].pause()
  sound[1].currentTime=0
  sound[1].play()
  
},1000);
setTimeout(()=>{
  clearInterval(bip)
  let tryAgain = document.getElementsByTagName("a")
  let congratulation = document.getElementsByTagName("h1")
  tryAgain[0].removeAttribute("style")
  congratulation[0].removeAttribute("style")
  sound[0].play()
  child.nextElementSibling.remove()
},5000)

