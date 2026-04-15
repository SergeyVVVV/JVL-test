'use client'

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react'
import Link from 'next/link'

/* ── US States ──────────────────────────────────────────────────────────── */
const US_STATES: [string, string][] = [
  ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],['CA','California'],
  ['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],['DC','District Of Columbia'],
  ['FL','Florida'],['GA','Georgia'],['HI','Hawaii'],['ID','Idaho'],['IL','Illinois'],
  ['IN','Indiana'],['IA','Iowa'],['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],
  ['ME','Maine'],['MD','Maryland'],['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],
  ['MS','Mississippi'],['MO','Missouri'],['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],
  ['NH','New Hampshire'],['NJ','New Jersey'],['NM','New Mexico'],['NY','New York'],
  ['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],['OK','Oklahoma'],['OR','Oregon'],
  ['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],['SD','South Dakota'],
  ['TN','Tennessee'],['TX','Texas'],['UT','Utah'],['VT','Vermont'],['VA','Virginia'],
  ['WA','Washington'],['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming'],
]

/* ── Shared input className ─────────────────────────────────────────────── */
const INPUT = 'wf-input'

/* ── Custom dropdown ────────────────────────────────────────────────────── */
function StateDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const label = value ? (US_STATES.find(([k]) => k === value)?.[1] ?? value) : 'Select a state...'

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={INPUT}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ color: value ? '#F4F3EC' : 'rgba(244,243,236,0.28)' }}>{label}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M2 4.5L6 8.5L10 4.5" stroke="rgba(244,243,236,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
          background: '#222527', border: '1px solid #2a2c2e', borderRadius: 4,
          maxHeight: 260, overflowY: 'auto', boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          {US_STATES.map(([code, name]) => (
            <button
              key={code}
              type="button"
              onClick={() => { onChange(code); setOpen(false) }}
              className="wf-dd-item"
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 14px', fontSize: 15, fontFamily: 'inherit',
                color: value === code ? '#059FFF' : '#F4F3EC',
                background: 'transparent', border: 'none', cursor: 'pointer',
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Disclaimer / How to Find SN toggles ────────────────────────────────── */
function Expandable({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none', border: '1px solid rgba(244,243,236,0.2)',
          borderRadius: 4, padding: '9px 16px', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, color: 'rgba(244,243,236,0.65)',
          display: 'flex', alignItems: 'center', gap: 8,
          transition: 'border-color 0.18s, color 0.18s',
        }}
      >
        {title}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
          style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          marginTop: 8, padding: '16px 20px',
          background: '#101213', border: '1px solid #252729', borderRadius: 4,
          fontSize: 14, color: 'rgba(244,243,236,0.72)', lineHeight: 1.7,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ── Step indicator ─────────────────────────────────────────────────────── */
const STEPS = ['Product', 'Your Info', 'Questionnaire']

function StepBar({ current, maxReached }: { current: number; maxReached: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 48 }}>
      {STEPS.map((label, i) => {
        const n = i + 1
        const active    = n === current
        const done      = n < current
        const reachable = n <= maxReached
        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                background: active ? '#FB671F' : done ? 'rgba(251,103,31,0.2)' : 'rgba(244,243,236,0.08)',
                border: active ? '2px solid #FB671F' : done ? '2px solid rgba(251,103,31,0.5)' : '2px solid rgba(244,243,236,0.18)',
                color: active ? '#fff' : done ? '#FB671F' : reachable ? 'rgba(244,243,236,0.5)' : 'rgba(244,243,236,0.25)',
                transition: 'all 0.2s',
              }}>
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : n}
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: active ? '#F4F3EC' : done ? 'rgba(251,103,31,0.8)' : 'rgba(244,243,236,0.35)',
                whiteSpace: 'nowrap',
              }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                width: 48, height: 1, margin: '0 8px', marginBottom: 22,
                background: done ? 'rgba(251,103,31,0.4)' : 'rgba(244,243,236,0.12)',
                transition: 'background 0.2s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Label helper ───────────────────────────────────────────────────────── */
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,236,0.70)', marginBottom: 8, letterSpacing: '0.04em' }}>
      {children}{required && <span style={{ color: '#FB671F', marginLeft: 4 }}>*</span>}
    </label>
  )
}

/* ── Main form ──────────────────────────────────────────────────────────── */
export default function WarrantyForm() {
  const [step, setStep]         = useState(1)
  const [maxStep, setMaxStep]   = useState(1)
  const [status, setStatus]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Step 1 fields
  const [serialNumber, setSerial]     = useState('')
  const [purchaseDate, setPurchDate]  = useState('')
  const [wherePurchased, setWhere]    = useState('')

  // Step 2 fields
  const [fullName, setFullName]       = useState('')
  const [email, setEmail]             = useState('')
  const [phone, setPhone]             = useState('')
  const [address, setAddress]         = useState('')
  const [city, setCity]               = useState('')
  const [stateVal, setStateVal]       = useState('')
  const [zip, setZip]                 = useState('')

  // Step 3 (optional feedback)
  const [feedback, setFeedback]       = useState('')

  const serialValid = /^CT10-\d{4}-\d{6}$/.test(serialNumber)
  const step1Valid  = serialValid && !!purchaseDate
  const step2Valid  = !!fullName && !!email && !!city && !!zip && !!stateVal

  function goStep(n: number) {
    setStep(n)
    setMaxStep(prev => Math.max(prev, n))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/warranty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serial_number: serialNumber, purchase_date: purchaseDate,
          where_purchased: wherePurchased, full_name: fullName,
          email, phone_number: phone, address, city, state: stateVal, zip, feedback,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        goStep(4)
      } else {
        setErrorMsg(data.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  /* ── Step 4: Thank You ── */
  if (status === 'success') {
    return (
      <div style={{
        background: '#181a1b', border: '1px solid #252729', borderRadius: 4,
        padding: '56px 40px', textAlign: 'center', maxWidth: 560, margin: '0 auto',
      }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>✓</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px', textTransform: 'uppercase' }}>
          Registration Complete!
        </h3>
        <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.62)', lineHeight: 1.7, margin: '0 0 32px' }}>
          Your warranty registration is complete. You&apos;re now fully covered.
          We&apos;ll follow up by email if needed.
        </p>
        <Link href="/en" className="btn-amazon" style={{ padding: '13px 28px', textTransform: 'uppercase' }}>
          Go to JVL Home
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 680, margin: '0 auto' }}>
      <StepBar current={step} maxReached={maxStep} />

      {/* ── Step 1: Product Registration ── */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F4F3EC', margin: '0 0 32px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Product Registration
          </h2>

          {/* Serial number */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Label required>Serial Number</Label>
              <Expandable title="How to find it?">
                <ol style={{ margin: 0, paddingLeft: 18 }}>
                  <li style={{ marginBottom: 6 }}>Check for a metallic sticker near the bottom of your unit, on either the left or right side.</li>
                  <li style={{ marginBottom: 6 }}>The label will display &quot;Serial No.&quot; or &quot;S/N&quot; followed by a sequence of numbers.</li>
                  <li style={{ marginBottom: 6 }}>Format: <strong style={{ color: '#F4F3EC' }}>CT10-XXXX-XXXXXX</strong></li>
                  <li>If you cannot locate the label, <Link href="/en/contact-us" style={{ color: '#059FFF' }}>contact our support team</Link>.</li>
                </ol>
              </Expandable>
            </div>
            <input
              type="text"
              required
              placeholder="CT10-0000-000000"
              value={serialNumber}
              onChange={e => setSerial(e.target.value.toUpperCase())}
              className={INPUT}
              style={{ borderColor: serialNumber && !serialValid ? '#ff4d4d' : undefined }}
            />
            {serialNumber && !serialValid && (
              <p style={{ color: '#ff4d4d', fontSize: 12, margin: '6px 0 0' }}>
                Format must be CT10-XXXX-XXXXXX (e.g. CT10-1234-567890)
              </p>
            )}
          </div>

          {/* Purchase date */}
          <div style={{ marginBottom: 28 }}>
            <Label required>Purchase Date</Label>
            <input
              type="date"
              required
              max={new Date().toISOString().slice(0, 10)}
              value={purchaseDate}
              onChange={e => setPurchDate(e.target.value)}
              className={INPUT}
            />
          </div>

          {/* Where purchased */}
          <div style={{ marginBottom: 36 }}>
            <Label>Where did you purchase your ECHO?</Label>
            <textarea
              rows={4}
              placeholder="Write a message..."
              value={wherePurchased}
              onChange={e => setWhere(e.target.value)}
              className={`${INPUT} wf-textarea`}
            />
          </div>

          {/* Footer row */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Expandable title="Warranty Disclaimer">
              <h5 style={{ color: '#F4F3EC', margin: '0 0 8px' }}>Warranty Period:</h5>
              <p style={{ margin: '0 0 12px' }}>One (1) year for the machine/parts and one (1) year for the touchscreen from the date of original purchase. Proof of purchase required.</p>
              <h5 style={{ color: '#F4F3EC', margin: '0 0 8px' }}>Conditions:</h5>
              <p style={{ margin: 0 }}>Warranty is void if abused, mishandled, repaired by a non-authorized agent, stored improperly, or tampered with.</p>
            </Expandable>
            <button
              type="button"
              onClick={() => goStep(2)}
              disabled={!step1Valid}
              className="btn-amazon"
              style={{ padding: '13px 32px', textTransform: 'uppercase', opacity: step1Valid ? 1 : 0.4, cursor: step1Valid ? 'pointer' : 'not-allowed' }}
            >
              Continue
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Your Information ── */}
      {step === 2 && (
        <div>
          <button
            type="button"
            onClick={() => goStep(1)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 24px',
              fontSize: 13, color: 'rgba(244,243,236,0.5)', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'color 0.18s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18L9 12L15 6"/>
            </svg>
            Back
          </button>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F4F3EC', margin: '0 0 32px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Your Information
          </h2>

          <div style={{ marginBottom: 28 }}>
            <Label required>Full Name</Label>
            <input type="text" required placeholder="Your Full Name" value={fullName}
              onChange={e => setFullName(e.target.value)} className={INPUT} />
          </div>

          <div className="wf-row" style={{ marginBottom: 28 }}>
            <div style={{ flex: 1 }}>
              <Label required>E-mail Address</Label>
              <input type="email" required placeholder="Your E-mail" value={email}
                onChange={e => setEmail(e.target.value)} className={INPUT} />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Phone Number</Label>
              <input type="tel" placeholder="(000) 000-0000" value={phone}
                onChange={e => setPhone(e.target.value)} className={INPUT} />
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <Label>Address</Label>
            <input type="text" placeholder="Street Address" value={address}
              onChange={e => setAddress(e.target.value)} className={INPUT} />
          </div>

          <div className="wf-row" style={{ marginBottom: 28 }}>
            <div style={{ flex: 1 }}>
              <Label required>City</Label>
              <input type="text" required placeholder="City" value={city}
                onChange={e => setCity(e.target.value)} className={INPUT} />
            </div>
            <div style={{ flex: '0 0 120px' }}>
              <Label required>ZIP</Label>
              <input type="text" required placeholder="00000" value={zip}
                onChange={e => setZip(e.target.value)} className={INPUT} />
            </div>
          </div>

          <div style={{ marginBottom: 36 }}>
            <Label required>State</Label>
            <StateDropdown value={stateVal} onChange={setStateVal} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => goStep(3)}
              disabled={!step2Valid}
              className="btn-amazon"
              style={{ padding: '13px 32px', textTransform: 'uppercase', opacity: step2Valid ? 1 : 0.4, cursor: step2Valid ? 'pointer' : 'not-allowed' }}
            >
              Continue
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Questionnaire (optional) ── */}
      {step === 3 && (
        <div>
          <button
            type="button"
            onClick={() => goStep(2)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 24px',
              fontSize: 13, color: 'rgba(244,243,236,0.5)', display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18L9 12L15 6"/>
            </svg>
            Back
          </button>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F4F3EC', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Questionnaire
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.65, margin: '0 0 36px' }}>
            This step is optional, but we&apos;d appreciate your input to help us get to know you better.
          </p>

          <div style={{ marginBottom: 36 }}>
            <Label>Any additional feedback?</Label>
            <textarea
              rows={5}
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              className={`${INPUT} wf-textarea`}
            />
          </div>

          {errorMsg && (
            <p style={{ color: '#ff4d4d', fontSize: 14, marginBottom: 20, textAlign: 'center' }}>{errorMsg}</p>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            {/* Skip = submit without feedback */}
            <button
              type="submit"
              onClick={() => setFeedback('')}
              disabled={status === 'sending'}
              className="btn-outline"
              style={{ padding: '13px 24px', textTransform: 'uppercase', opacity: status === 'sending' ? 0.5 : 1 }}
            >
              Skip this Step
            </button>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-amazon"
              style={{ padding: '13px 32px', textTransform: 'uppercase', opacity: status === 'sending' ? 0.6 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
            >
              {status === 'sending' ? 'Submitting...' : 'Submit'}
              {status !== 'sending' && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Shared styles ── */}
      <style>{`
        .wf-input {
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
        .wf-input::placeholder { color: rgba(244,243,236,0.28); }
        .wf-input:focus { border-color: #059FFF; }
        .wf-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); cursor: pointer; }
        .wf-textarea { resize: vertical; min-height: 120px; }
        .wf-row { display: flex; gap: 16px; }
        .wf-dd-item:hover { background: rgba(244,243,236,0.06) !important; }
        @media (max-width: 600px) {
          .wf-row { flex-direction: column; gap: 28px; }
        }
      `}</style>
    </form>
  )
}
