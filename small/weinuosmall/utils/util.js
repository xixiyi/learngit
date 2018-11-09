const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  /**return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')**/
  return [year, month, day].map(formatNumber).join('-')
}

const zuoritime = data => {
  var timestamp = Date.parse(data);
  timestamp = timestamp / 1000
  timestamp = timestamp - 86400
  timestamp = timestamp * 1000

  data = new Date(timestamp)
  const year = data.getFullYear()
  const month = data.getMonth() + 1
  const day = data.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  zuoritime: zuoritime
}
