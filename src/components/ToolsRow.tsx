import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { tools, type PortfolioTool } from '../data/tools'

type RevealProps = {
  tool: PortfolioTool
  index: number
  closing: boolean
  onClose: () => void
}

function ToolScrollReveal({ tool, index, closing, onClose }: RevealProps) {
  return (
    <section
      id="tool-scroll-panel"
      className={`tool-scroll ${closing ? 'tool-scroll--closing' : ''}`}
      style={{ '--scroll-origin': `${(index + .5) * 82}px`, '--visual-fill': tool.visualFill } as CSSProperties}
      aria-label={`${tool.name} details`}
    >
      <span className="tool-scroll__roll" aria-hidden="true" />
      <div className="tool-scroll__paper">
        <div className="tool-scroll__stitches" aria-hidden="true" />
        <span className="tool-scroll__tape" aria-hidden="true" />
        <button className="tool-scroll__close" type="button" onClick={onClose} aria-label={`Close ${tool.name} details`}>×</button>
        <div className="tool-scroll__badge" aria-hidden="true">
          <img src={tool.src} alt="" style={{ '--visual-fill': tool.visualFill } as CSSProperties} />
        </div>
        <div className="tool-scroll__heading">
          <h4>{tool.name}</h4>
          <span>IDEAS INTO PRACTICE</span>
        </div>
        <span className="tool-scroll__note" aria-hidden="true">Same tool.<br />Bigger ideas.</span>
        <div className="tool-scroll__columns">
          <div>
            <h5>How I use it</h5>
            <p>{tool.summary}</p>
          </div>
          <div>
            <h5>What I’ve learned</h5>
            <p>{tool.learned}</p>
          </div>
        </div>
        <div className="tool-scroll__footer">
          <ul className="tool-scroll__tags" aria-label="Focus areas">
            {tool.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
          <div className="tool-scroll__rating" aria-label={`Comfort level ${tool.rating} out of ${tool.outOf}`}>
            <span>Comfort level</span>
            <div className="tool-scroll__pips" aria-hidden="true">
              {Array.from({ length: tool.outOf }, (_, pip) => <i key={pip} className={pip < tool.rating ? 'is-filled' : ''} />)}
            </div>
            <strong>{tool.rating}/{tool.outOf}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ToolsRow() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [closing, setClosing] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') beginClose(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex])

  function beginClose(nextIndex: number | null) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setClosing(true)
    closeTimer.current = setTimeout(() => {
      setActiveIndex(nextIndex)
      setClosing(false)
      closeTimer.current = null
    }, 220)
  }

  function selectTool(index: number) {
    if (activeIndex === null) {
      setActiveIndex(index)
      setClosing(false)
    } else {
      beginClose(index === activeIndex ? null : index)
    }
  }

  return (
    <div className={`tool-stack ${activeIndex !== null ? 'tool-stack--open' : ''}`}>
      <h3>TOOLS I WORK WITH</h3>
      <ul className="tool-stack__icons">
        {tools.map((tool, index) => (
          <li key={tool.name} style={{ '--tool-index': index, '--visual-fill': tool.visualFill } as CSSProperties}>
            <button
              type="button"
              aria-label={`Show ${tool.name} details`}
              aria-expanded={activeIndex === index && !closing}
              aria-controls={activeIndex === index ? 'tool-scroll-panel' : undefined}
              onClick={() => selectTool(index)}
            >
              <img src={tool.src} alt="" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      {activeIndex !== null && (
        <ToolScrollReveal
          key={activeIndex}
          tool={tools[activeIndex]}
          index={activeIndex}
          closing={closing}
          onClose={() => beginClose(null)}
        />
      )}
    </div>
  )
}
