const timers = {}

function startTask(id, time) {
  timers[id] = setTimeout(() => {
    self.postMessage({ id })
  }, time)
}

function stopTask(id) {
  clearTimeout(timers[id])
}

self.addEventListener('message', ({ data }) => {
  console.log(data)
  if (data.action === 'start') {
    startTask(data.id, data.timeout)
  }

  if (data.action === 'stop') {
    stopTask(data.id)
  }
})
