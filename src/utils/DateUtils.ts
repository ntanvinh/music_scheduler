export function timestamp() {
  return new Date().toISOString();
}

export function getCurrentTimeInMinutes() {
  return new Date().getHours() * 60 + new Date().getMinutes();
}
