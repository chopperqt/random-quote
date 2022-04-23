export type TFilters = 'qq' | 'q' | 'p' | 'authors'

export function updateUrlParams({ ...props }) {
  const href = window.location.href

  const url = new URL(href)

  Object.entries(props).map(([key, value]) => url.searchParams.set(key, value))

  window.history.pushState('', '', url.pathname + url.search)
}

export function updateUrl(str: string | number) {
  const href = window.location.href

  const url = new URL(href)

  window.history.pushState('', '', url.pathname + str)
}

export function getUrlParam(str: TFilters) {
  const url = new URL(window.location.href)

  return url.searchParams.get(str)
}

export function getUrlParams() {
  const url = new URL(window.location.href)
  const params: { [key: string]: string } = {}

  url.searchParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}

export function deleteUrlParam(string: string) {
  const url = new URL(window.location.href)

  url.searchParams.delete(string)

  window.history.pushState('', '', url.pathname + url.search)
}

