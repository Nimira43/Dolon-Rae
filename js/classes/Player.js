class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations
  }) {
    super({ imageSrc, frameRate, scale })
    this.position = position 
    this.velocity = {
      x: 0,
      y: 1
    }
    this.collisionBlocks = collisionBlocks
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 10,
      height: 10
    }
    this.animations = animations
    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc
      this.animations[key].image = image
    }
  }
  switchSprite(key) {
    if (this.image === this.animations[key]) return
    this.image = this.animations[key].image
    this.frameBuffer = this.animations[key].frameBuffer
    this.frameRate = this.animations[key].frameRate
  }

  update() {
    this.updateFrames()
    this.updateHitbox()
    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
    ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
    
    this.draw()

    this.position.x += this.velocity.x   
    this.updateHitbox()
    this.checkForHorizonalCollisions()
    this.applyGravity()
    this.updateHitbox()
    this.checkForVerticalCollisions()
  }
  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 35,
        y: this.position.y + 26
      },
      width: 14,
      height: 27
    }
  }
  checkForHorizonalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0

          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0

          const offset = this.hitbox.position.x - this.position.x
          
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
      }
    }
  }
  applyGravity() {
    this.position.y += this.velocity.y   
    this.velocity.y += gravity
  }
  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0

          const offset = this.hitbox.position.y - this.position.y

          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
      }
    }
  }
}