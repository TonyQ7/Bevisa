import { copyText } from '../src/lib/clipboard'

describe('copyText', () => {
  it('uses the async clipboard API when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    await expect(copyText('founders@example.test')).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('founders@example.test')
  })

  it('falls back to a temporary textarea', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
    await expect(copyText('fallback@example.test')).resolves.toBe(true)
    expect(document.querySelector('textarea')).toBeNull()
  })
})
