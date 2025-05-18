const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
const gravity = 0.5

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
  }
  draw() {
    if (!this.image) return
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
  update() {
    this.draw()
  }
}

class Player {
  constructor(position) {
    this.position = position 
    this.velocity = {
      x: 0,
      y: 1
    }
    this.height = 100
  }
  draw() {
    ctx.fillStyle = '#ff4500'
    ctx.fillRect(this.position.x, this.position.y, 100, this.height)
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x   
    this.position.y += this.velocity.y   
    
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += gravity  
    } else {
      this.velocity.y = 0
    }
  }
}

const player = new Player({
  x: 0,
  y: 0
})

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: '../images/screen/background.png'
})

function animate() {
  window.requestAnimationFrame(animate)
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)  
  ctx.save()
  ctx.scale(4, 4)
  background.update()
  ctx.restore() 
  player.update()
  player.velocity.x = 0
  if (keys.p.pressed) player.velocity.x = 5
  if (keys.o.pressed) player.velocity.x = -5
}

const keys = {
  p: {
    pressed: false
  },
  o: {
    pressed: false
  },
  q: {
    pressed: false
  }
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'p':
      keys.p.pressed = true
      break
    case 'o':
      keys.o.pressed = true
      break
    case 'q':
      player.velocity.y = -20    
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'p':
      keys.p.pressed = false
      break
    case 'o':
      keys.o.pressed = false
      break
  }
})
