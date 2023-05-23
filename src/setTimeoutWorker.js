let timer = 0

const worker = new Worker(new URL('worker.js', import.meta.url))

export function setTimeout(cb, timeout = 0) {
  const id = timer++
  worker.postMessage({
    action: 'start',
    id,
    timeout
  })

  worker.addEventListener('message', ({ data }) => {
    if (data.id === id) {
      cb()
    }
  })

  return id
}

export function clearTimeout(id) {
  worker.postMessage({
    action: 'stop',
    id
  })
}
