import { validatedEmail, validatedHttpsUrl, validatedReportUrl } from '../src/content/config'

describe('launch configuration', () => {
  it('activates only validated HTTPS destinations', () => {
    expect(validatedHttpsUrl('https://cal.example.test/bevisa')).toBe('https://cal.example.test/bevisa')
    expect(validatedHttpsUrl('http://example.test')).toBeNull()
    expect(validatedHttpsUrl('javascript:alert(1)')).toBeNull()
  })

  it('activates validated email and report destinations', () => {
    expect(validatedEmail('team@example.test')).toBe('team@example.test')
    expect(validatedEmail('not-an-email')).toBeNull()
    expect(validatedReportUrl('./sample-report.pdf')).toBe('./sample-report.pdf')
    expect(validatedReportUrl('https://example.test/report.pdf')).toBe('https://example.test/report.pdf')
    expect(validatedReportUrl('../private/report.pdf')).toBeNull()
  })
})
