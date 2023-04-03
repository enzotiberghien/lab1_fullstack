const $ = (element) => {
  return document.querySelector(element)
}

const $all = (element) => {
  return document.querySelectorAll(element)
}

export { $, $all }