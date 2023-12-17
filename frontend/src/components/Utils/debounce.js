export function debounce(callback, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    callback(...args)
    timer = setTimeout(() => {
      callback.apply(...args);
    }, timeout);
  };
}