import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Editor from '../src/Editor'

// These tests assume the editor exposes accessible controls labeled:
// Element (select), Font size, Font color, Line spacing, Space before, Space after, Font style
// and that preview texts include: Title, Heading, Subheading, Bullets, Paragraph

describe('Visual CSS Editor - basic UX', () => {
  it('renders all preview sections', () => {
    render(<Editor />)

    expect(screen.getByText(/Title/i)).toBeInTheDocument()
    expect(screen.getByText(/Heading/i)).toBeInTheDocument()
    expect(screen.getByText(/Subheading/i)).toBeInTheDocument()
    expect(screen.getByText(/Bullets/i)).toBeInTheDocument()
    expect(screen.getByText(/Paragraph/i)).toBeInTheDocument()
  })

  it('updates font size and color for Heading via controls', async () => {
    const user = userEvent.setup()
    render(<Editor />)

    const elementSelect = screen.getByLabelText(/element/i)
    await user.selectOptions(elementSelect, 'Heading')

    const sizeInput = screen.getByLabelText(/font size/i)
    fireEvent.change(sizeInput, { target: { value: '48' } })

    const colorInput = screen.getByLabelText(/font color/i)
    fireEvent.change(colorInput, { target: { value: '#ff0000' } })

    const heading = screen.getByText(/Heading/i)
    // Expect inline styles to reflect chosen settings
    expect(heading).toHaveStyle('font-size: 48px')
    // color may be set as hex; check substring to be resilient
    expect(heading.style.color || '').toMatch(/#?ff0000|rgb\(255, ?0, ?0\)/i)
  })

  it('applies spacing and line-height to Paragraph', async () => {
    const user = userEvent.setup()
    render(<Editor />)

    const elementSelect = screen.getByLabelText(/element/i)
    await user.selectOptions(elementSelect, 'Paragraph')

    const beforeInput = screen.getByLabelText(/space before/i)
    const afterInput = screen.getByLabelText(/space after/i)
    const lineSpacing = screen.getByLabelText(/line spacing/i)

    fireEvent.change(beforeInput, { target: { value: '20' } })
    fireEvent.change(afterInput, { target: { value: '10' } })
    fireEvent.change(lineSpacing, { target: { value: '2' } })

    const paragraph = screen.getByText(/Paragraph/i)
    expect(paragraph).toHaveStyle('margin-top: 20px')
    expect(paragraph).toHaveStyle('margin-bottom: 10px')
    expect(paragraph).toHaveStyle('line-height: 2')
  })

  it('lets user change font style and reflects it in preview', async () => {
    const user = userEvent.setup()
    render(<Editor />)

    const elementSelect = screen.getByLabelText(/element/i)
    await user.selectOptions(elementSelect, 'Title')

    const fontStyle = screen.getByLabelText(/font style/i)
    // try selecting an italic/italic-like option; accept either a toggle or select change
    if (fontStyle.type === 'checkbox') {
      fireEvent.click(fontStyle)
    } else {
      await user.selectOptions(fontStyle, 'Italic')
    }

    const title = screen.getByText(/Title/i)
    // italic usually maps to font-style: italic or font-weight for bold
    const style = title.style.cssText
    expect(/italic|oblique|font-style:/.test(style) || /bold|font-weight:/.test(style)).toBe(true)
  })
})
