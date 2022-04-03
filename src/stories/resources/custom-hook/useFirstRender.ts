import { useEffect, useRef } from 'react'

//reference: https://github.com/sachinraja/rodemirror/blob/main/src/use-first-render.ts
export const useFirstRender = () => {
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  return firstRender.current
}