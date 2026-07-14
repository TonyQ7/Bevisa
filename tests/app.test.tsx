import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from '../src/App'
import { LocaleProvider } from '../src/components/LocaleProvider'
import { EN_COPY, LEGAL_NOTICE } from '../src/content/copy'
import { SV_COPY } from '../src/content/copy.sv'

function renderApp(): void {
  window.localStorage.clear()
  render(
    <LocaleProvider>
      <App />
    </LocaleProvider>,
  )
}

describe('Bevisa application shell', () => {
  it('renders the complete semantic narrative and honest pending states', async () => {
    renderApp()
    fireEvent.wheel(window)
    expect(screen.getByRole('heading', { level: 1, name: EN_COPY.hero.title })).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    await waitFor(() => expect(screen.getAllByText(LEGAL_NOTICE)).toHaveLength(2))
    expect(screen.getAllByRole('button', { name: EN_COPY.offer.book }).at(-1)).toBeDisabled()
    expect(screen.getByText(EN_COPY.offer.emailPending)).toBeInTheDocument()
    expect(screen.getByText(EN_COPY.offer.reportPending)).toBeInTheDocument()
  })

  it('switches to the complete Swedish locale and updates document language', () => {
    renderApp()
    fireEvent.click(screen.getAllByRole('button', { name: 'SV' })[0]!)
    expect(screen.getByRole('heading', { level: 1, name: SV_COPY.hero.title })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('sv')
  })
})
