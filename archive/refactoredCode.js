const keyActions = {
  keydown: {
    p: () => (keys.p.pressed = true),
    o: () => (keys.o.pressed = true),
    q: () => (player.velocity.y = -20),
  },
  keyup: {
    p: () => (keys.p.pressed = false),
    o: () => (keys.o.pressed = false),
  },
}

window.addEventListener('keydown', (event) => {
  if (keyActions.keydown[event.key]) keyActions.keydown[event.key]()
})

window.addEventListener('keyup', (event) => {
  if (keyActions.keyup[event.key]) keyActions.keyup[event.key]()
})
