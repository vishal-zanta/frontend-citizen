import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import isEqual from 'lodash/isEqual'

type FilterValue = string | string[] | number | boolean | null | undefined
type FilterState = Record<string, FilterValue>
type StringMap = Record<string, string>

const isEmpty = (v: unknown): boolean =>
  v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)

// state value -> URL value: array => "a,b", anything else => string
const serializeValue = (value: unknown): string =>
  Array.isArray(value) ? value.join(',') : String(value)

// Prefixed params from the URL with the prefix stripped: { color: "red,blue" }
const getPrefixedParams = (searchParams: URLSearchParams, prefix: string): StringMap => {
  const result: StringMap = {}
  searchParams.forEach((value, k) => {
    if (k.startsWith(prefix)) result[k.slice(prefix.length)] = value
  })
  return result
}

// State -> flat string map, ignoring empty values: { color: "red,blue" }
const serializeState = <T extends object>(state: T | null | undefined): StringMap => {
  const result: StringMap = {}
  Object.entries(state ?? {}).forEach(([k, v]) => {
    if (!isEmpty(v)) result[k] = serializeValue(v)
  })
  return result
}

const useSyncSearchParams = <T extends object = FilterState>(
  state: T,
  setState: (value: T) => void,
  key: string = 'filter.'
): void => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isHydrated = useRef<boolean>(false)

  useEffect(() => {
    const urlParams = getPrefixedParams(searchParams, key)

    // 1) Initial run: URL -> state (values stay as strings, e.g. "red,blue")
    if (!isHydrated.current) {
      isHydrated.current = true

      if (Object.keys(urlParams).length > 0) {
        if (!isEqual(urlParams, serializeState(state))) {
          setState({ ...state, ...urlParams } as T)
        }
        return // don't overwrite the URL with the not-yet-hydrated state
      }
    }

    // 2) Later runs: state -> URL
    const serialized = serializeState(state)
    if (isEqual(serialized, urlParams)) return // already in sync

    const next = new URLSearchParams(searchParams) as any

    // remove old prefixed keys
    Array.from(next.keys())
      .filter((k : string) => k.startsWith(key))
      .forEach((k) => next.delete(k))

    // add current state
    Object.entries(serialized).forEach(([k, v]) => next.set(`${key}${k}`, v))

    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])
}

export default useSyncSearchParams