setTimeout(()=>{
  let tryAgain = document.getElementsByTagName("a")
  tryAgain[0].removeAttribute("style")
},2000)
sound = document.getElementsByTagName("audio")
sound[0].play()