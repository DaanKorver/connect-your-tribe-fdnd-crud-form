const main = document.querySelector('main')
const transitionSpeed = 500

function enter() {
  main.style.setProperty('transition', `opacity ${transitionSpeed}ms`)
  main.style.setProperty('opacity', 1)
}

function leave(location) {
  if(!location) return
  main.style.setProperty('opacity', 0)
  setTimeout(()=>{
    window.location = location
  }, (transitionSpeed + 50))
}

export {
  enter,
  leave
}