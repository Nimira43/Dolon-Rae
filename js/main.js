const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

ctx.fillStyle = '#fff'
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = '#ff4500'
ctx.fillRect(200, 100, 100, 100)
