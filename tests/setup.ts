import '@testing-library/jest-dom/vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
})

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly thresholds = [0]
  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
  unobserve(): void {}
}

Object.defineProperty(window, 'IntersectionObserver', { value: IntersectionObserverMock })
Object.defineProperty(globalThis, 'IntersectionObserver', { value: IntersectionObserverMock })
Object.defineProperty(document, 'execCommand', { value: () => true, configurable: true })
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true })
