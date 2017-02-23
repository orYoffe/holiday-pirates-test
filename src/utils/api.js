const get = (url, cb) => {
  let request = new XMLHttpRequest()
  request.open('GET', url, true)

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText)
      cb(data)
    } else {
      cb('error')
    }
  }

  request.onerror = function() {
    cb('error')
  }

  request.send()
}

const post = (url, data, cb) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.status < 400) {
      cb(xhr.responseText)
    } else {
      cb('error')
    }
  }
  xhr.onerror = function() {
    cb('error')
  }
  xhr.send(encodeURI(data))
}

export default {
  get,
  post,
}
