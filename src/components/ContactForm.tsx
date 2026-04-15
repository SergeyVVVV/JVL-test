'use client'

import { useState, FormEvent, useRef, useEffect } from 'react'

const DEPARTMENTS = [
  { value: 'flex',         label: 'FLEX' },
  { value: 'echo',         label: 'ECHO' },
  { value: 'online_games', label: 'Online Games' },
  { value: 'general',      label: 'General' },
]

export default function ContactForm() {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [department, setDept]     = useState('')
  const [message, setMessage]     = useState('')
  const [status, setStatus]       = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg]   = useState('')
  const [deptOpen, setDeptOpen]   = useState(false)
  const deptRef                   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setDeptOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, department, message }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
      } else {
        setErrorMsg(data.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        background: '#181a1b', border: '1px solid #252729', borderRadius: 4,
        padding: '48px 40px', textAlign: 'center', maxWidth: 560, margin: '0 auto',
      }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>✓</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px', textTransform: 'uppercase' }}>
          Message Sent!
        </h3>
        <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.62)', lineHeight: 1.7, margin: 0 }}>
          Your message has been sent to the appropriate department.
          Our managers will contact you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 816, margin: '0 auto' }}>

      {/* Name */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.70)', marginBottom: 8, letterSpacing: '0.04em' }}>
          Name
        </label>
        <input
          type="text"
          required
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="cf-input"
        />
      </div>

      {/* Email + Department row */}
      <div className="cf-row" style={{ marginBottom: 28 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.70)', marginBottom: 8, letterSpacing: '0.04em' }}>
            E-mail address
          </label>
          <input
            type="email"
            required
            placeholder="Your E-mail address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="cf-input"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.70)', marginBottom: 8, letterSpacing: '0.04em' }}>
            Department
          </label>
          <div ref={deptRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setDeptOpen(o => !o)}
              className="cf-input cf-select-btn"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ color: department ? '#F4F3EC' : 'rgba(244,243,236,0.28)' }}>
                {department ? DEPARTMENTS.find(d => d.value === department)?.label : 'Select department...'}
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, transition: 'transform 0.2s', transform: deptOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M2 4.5L6 8.5L10 4.5" stroke="rgba(244,243,236,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {deptOpen && (
              <div className="cf-dropdown" style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 100,
                background: '#222527', border: '1px solid #2a2c2e', borderRadius: 4,
                overflow: 'hidden',
              }}>
                {DEPARTMENTS.map(d => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => { setDept(d.value); setDeptOpen(false) }}
                    className="cf-dropdown-item"
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '11px 16px', fontSize: 15, fontFamily: 'inherit',
                      color: d.value === department ? '#059FFF' : '#F4F3EC',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                    }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: 36 }}>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.70)', marginBottom: 8, letterSpacing: '0.04em' }}>
          Write a message
        </label>
        <textarea
          required
          rows={6}
          placeholder="Write a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="cf-input cf-textarea"
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p style={{ color: '#ff4d4d', fontSize: 14, marginBottom: 20, textAlign: 'center' }}>
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <div style={{ textAlign: 'center' }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-amazon"
          style={{ padding: '14px 48px', textTransform: 'uppercase', opacity: status === 'sending' ? 0.6 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
        >
          {status === 'sending' ? 'Sending...' : 'Send'}
          {status !== 'sending' && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      <style>{`
        .cf-input {
          width: 100%;
          background: #181a1b;
          border: 1px solid #2a2c2e;
          border-radius: 4px;
          padding: 13px 16px;
          font-size: 15px;
          color: #F4F3EC;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          -webkit-appearance: none;
        }
        .cf-input::placeholder { color: rgba(244,243,236,0.28); }
        .cf-input:focus { border-color: #059FFF; }
        .cf-select-btn { appearance: none; -webkit-appearance: none; }
        .cf-textarea { resize: vertical; min-height: 140px; }
        .cf-dropdown-item:hover { background: rgba(244,243,236,0.06) !important; }
        .cf-row { display: flex; gap: 16px; }
        @media (max-width: 600px) {
          .cf-row { flex-direction: column; gap: 28px; }
        }
      `}</style>
    </form>
  )
}
