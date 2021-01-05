export function get(key) {
  return (obj) => obj[key];
}

export function equal(key, value) {
  return (obj) => obj[key] === value;
}

export const getURL = (BASE_URL) => (path) => BASE_URL + path;
