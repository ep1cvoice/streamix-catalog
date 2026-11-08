export function info(...params: unknown[]): void {
  if (process.env.NODE_ENV !== 'test') console.log(...params)
}

export function error(...params: unknown[]): void {
  if (process.env.NODE_ENV !== 'test') console.error(...params)
}
