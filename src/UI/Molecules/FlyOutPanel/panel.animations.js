import { keyframes } from "styled-components"

export const duration = 500

/**
 * These six animations are used to control the panel's sliding animation.
 */

export const openToClosed = keyframes`
0% {
  right: -40rem;
}
100% {
  right: -80rem;
}
`

export const closedToOpen = keyframes`
0% {
  right: -80rem;
}
100% {
  right: -40rem;
}
`

export const openToWide = keyframes`
0% {
  right: -40rem;
}
50% {
  right: -40rem;
}
100% {
  right: -1rem;
}
`

export const wideToOpen = keyframes`
0% {
  right: -1rem;
}
50% {
  right: -1rem;
}
100% {
  right: -40rem;
}
`

export const closedToWide = keyframes`
0% {
  right: -80rem;
}
100% {
  right: 0rem;
}
`

export const wideToClosed = keyframes`
0% {
  right: -1rem;
}
100% {
  right: -80rem;
}
`

/**
 * These animations are on the BodyWrapper and WideBodyWrapper
 * They handle the visual for the transition between Open > Wide and vice versa
 */

export const bodyExpand = keyframes`
0% {
  opacity: 1;
  max-height: calc(100% - 14rem);
}
50% {
  opacity: 0;
  max-height: 0;
}
100% {
  opacity: 0;
  max-height: 0;
}
`

export const wideBodyExpand = keyframes`
0% {
  opacity: 0;
  max-height: 0;
}
50% {
  opacity: 0;
  max-height: 0;
}
100% {
  opacity: 1;
  max-height: calc(100% - 14rem);
}
`

export const bodyContract = keyframes`
0% {
  opacity: 0;
  max-height: 0;
}
50% {
  opacity: 0;
  max-height: 0;
}
100% {
  opacity: 1;
  max-height: calc(100% - 14rem);
}
`

export const wideBodyContract = keyframes`
0% {
  opacity: 1;
  max-height: calc(100% - 14rem);
}
50% {
  opacity: 0;
  max-height: 0;
}
100% {
  opacity: 0;
  max-height: 0;
}
`

export const wideBodyClose = keyframes`
0% {
  opacity: 1;
  max-height: calc(100% - 14rem);
}
50% {
  opacity: 1;
  max-height: calc(100% - 14rem);
}
100% {
  opacity: 0;
  max-height: 0;
}
`
