const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}
const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          }
        }
      ))
    }
  })
})
console.log(collisionBlocks)

const gravity = 0.5
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
  ctx.translate(0, -background.image.height + scaledCanvas.height)
  background.update()
  collisionBlocks.forEach((collisionBlocks) => collisionBlocks.update())
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
