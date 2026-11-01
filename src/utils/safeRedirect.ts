// Only paths inside the app: "//host" and "/\host" are read by browsers as another origin
export function safeRedirect(target: string | null): string {
  return target && target.startsWith('/') && !/^\/[/\\]/.test(target) ? target : '/'
}
