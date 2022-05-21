export type TFilters = 'qq' | 'q' | 'p' | 'authors'

function fixedEncodeURI(str: string): string {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

export function updateUrlParams({ ...props }) {
  const href = window.location.href

  const url = new URL(href)

  Object.entries(props).map(([key, value]) => {
    let params = url.searchParams.set(key, value)

    if (Array.isArray(value)) {
      params = url.searchParams.set(key, JSON.stringify(value))
    }

    return params
  })

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
  const params: Record<string, string> = {}

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

