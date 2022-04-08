import React from 'react'

export function updateUrlParams({ ...props }) {
  const href = window.location.href

  const url = new URL(href)

  Object.entries(props).map(([key, value]) => {
    url.searchParams.set(key, value)
  })

  window.history.pushState('', '', url.pathname + url.search)
}

export function getUrlParam(str: string) {
  const url = new URL(window.location.host)

  return url.searchParams.get(str)
}