import { useState } from 'react'
import './BookingForm.css'

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Computer Science & Business Systems'
]

function BookingForm({ onBook, availableTickets, ticketPrice }) {
  const [formData, setFormData] = useState({ name: '', email: '', department: '', tickets: 1 })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return !String(value).trim() ? 'Full name is required' : ''
      case 'email':
        if (!String(value).trim()) return 'Email address is required'
        if (!validateEmail(value)) return 'Enter a valid email address'
        return ''
      case 'department':
        return !String(value).trim() ? 'Please select your department' : ''
      case 'tickets': {
        const n = parseInt(value)
        if (!value || isNaN(n)) return 'Number of tickets is required'
        if (n <= 0) return 'Must book at least 1 ticket'
        if (n > availableTickets) return `Only ${availableTickets} tickets available`
        return ''
      }
      default: return ''
    }
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key])
      if (err) newErrors[key] = err
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const err = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: err }))
    }
  }

  const handleTicketChange = (delta) => {
    const next = Math.min(availableTickets, Math.max(1, (parseInt(formData.tickets) || 1) + delta))
    setFormData(prev => ({ ...prev, tickets: next }))
    if (touched.tickets) {
      const err = validateField('tickets', next)
      setErrors(prev => ({ ...prev, tickets: err }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const err = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, department: true, tickets: true })
    if (!validateForm()) return

    setIsSubmitting(true)
    // Simulate async processing
    await new Promise(res => setTimeout(res, 800))
    setIsSubmitting(false)
    onBook({ ...formData, tickets: parseInt(formData.tickets) })
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', department: '', tickets: 1 })
    setErrors({})
    setTouched({})
  }

  const tickets = parseInt(formData.tickets) || 0
  const calculatedTotal = tickets > 0 && !errors.tickets ? tickets * ticketPrice : 0
  const isValid = formData.name && formData.email && formData.department && !errors.name && !errors.email && !errors.department && !errors.tickets

  return (
    <div className="booking-form-container">
      {/* Header */}
      <div className="form-header">
        <div className="form-icon">🎫</div>
        <div>
          <h2>Book Your Tickets</h2>
          <p className="form-sub">Fill in your details to secure your seat</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form" noValidate>

        {/* Name */}
        <div className={`form-group ${errors.name && touched.name ? 'has-error' : touched.name && !errors.name ? 'is-valid' : ''}`}>
          <label htmlFor="name">
            <span className="lbl-icon">👤</span> Full Name
          </label>
          <div className="input-wrap">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {touched.name && !errors.name && <span className="check-icon">✓</span>}
          </div>
          {errors.name && touched.name && <span className="error-msg"><span>⚠</span> {errors.name}</span>}
        </div>

        {/* Email */}
        <div className={`form-group ${errors.email && touched.email ? 'has-error' : touched.email && !errors.email ? 'is-valid' : ''}`}>
          <label htmlFor="email">
            <span className="lbl-icon">✉️</span> Email Address
          </label>
          <div className="input-wrap">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {touched.email && !errors.email && formData.email && <span className="check-icon">✓</span>}
          </div>
          {errors.email && touched.email && <span className="error-msg"><span>⚠</span> {errors.email}</span>}
        </div>

        {/* Department */}
        <div className={`form-group ${errors.department && touched.department ? 'has-error' : touched.department && !errors.department ? 'is-valid' : ''}`}>
          <label htmlFor="department">
            <span className="lbl-icon">🏛️</span> Department
          </label>
          <div className="input-wrap select-wrap">
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select your department</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <span className="select-arrow">▾</span>
          </div>
          {errors.department && touched.department && <span className="error-msg"><span>⚠</span> {errors.department}</span>}
        </div>

        {/* Ticket Stepper */}
        <div className="form-group">
          <label><span className="lbl-icon">🎟️</span> Number of Tickets</label>
          <div className="ticket-stepper">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleTicketChange(-1)}
              disabled={parseInt(formData.tickets) <= 1}
            >−</button>
            <div className="stepper-display">
              <span className="stepper-num">{formData.tickets}</span>
              <span className="stepper-sub">ticket{formData.tickets !== 1 ? 's' : ''}</span>
            </div>
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleTicketChange(1)}
              disabled={parseInt(formData.tickets) >= availableTickets}
            >+</button>
          </div>
          {errors.tickets && touched.tickets && <span className="error-msg"><span>⚠</span> {errors.tickets}</span>}
        </div>

        {/* Total */}
        {calculatedTotal > 0 && (
          <div className="total-card">
            <div className="total-row">
              <span>{formData.tickets} × ₹{ticketPrice}</span>
              <span className="total-amount">₹{calculatedTotal}</span>
            </div>
            <div className="total-label">Total Amount</div>
          </div>
        )}

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="submit"
            className={`btn-submit ${isSubmitting ? 'loading' : ''} ${isValid ? 'ready' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <><span className="spinner" />Processing…</>
            ) : (
              <><span>🎫</span> Confirm Booking</>
            )}
          </button>
          <button type="button" onClick={handleReset} className="btn-reset">
            ↺ Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
