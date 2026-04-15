'use client'

import { useState, FormEvent } from 'react'

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
    <form onSubmit={handleSubmit} style={{ maxWidth: 680, margin: '0 auto' }}>

      {/* Name */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.45)', marginBottom: 8, letterSpacing: '0.04em' }}>
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
          <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.45)', marginBottom: 8, letterSpacing: '0.04em' }}>
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
          <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.45)', marginBottom: 8, letterSpacing: '0.04em' }}>
            Department
          </label>
          <select
            required
            value={department}
            onChange={e => setDept(e.target.value)}
            className="cf-input cf-select"
          >
            <option value="">Select department...</option>
            {DEPARTMENTS.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: 36 }}>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.45)', marginBottom: 8, letterSpacing: '0.04em' }}>
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
        .cf-select { cursor: pointer; }
        .cf-select option { background: #181a1b; color: #F4F3EC; }
        .cf-textarea { resize: vertical; min-height: 140px; }
        .cf-row { display: flex; gap: 16px; }
        @media (max-width: 600px) {
          .cf-row { flex-direction: column; gap: 28px; }
        }
      `}</style>
    </form>
  )
}
