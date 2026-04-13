import { useEffect, useState } from 'react'
import './BookingConfirmation.css'

function BookingConfirmation({ bookingData, onReset }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`confirmation-wrapper ${visible ? 'visible' : ''}`}>
      {/* Confetti particles */}
      <div className="confetti-ring" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="confetti-dot" style={{ '--i': i }} />
        ))}
      </div>

      <div className="confirmation-card">
        {/* Success icon */}
        <div className="success-icon-wrap">
          <div className="success-ring" />
          <div className="success-icon">✓</div>
        </div>

        <h2>Booking Confirmed!</h2>
        <p className="success-msg">🎉 Your seat at Tech Fest 2026 is secured.</p>

        {/* Booking ID */}
        <div className="booking-id-tag">
          <span className="id-label">Booking ID</span>
          <span className="id-value">{bookingData.bookingId}</span>
        </div>

        {/* Summary */}
        <div className="booking-summary">
          <h3>📋 Booking Summary</h3>

          <div className="summary-grid">
            <SummaryItem icon="👤" label="Name" value={bookingData.name} />
            <SummaryItem icon="✉️" label="Email" value={bookingData.email} />
            <SummaryItem icon="🏛️" label="Department" value={bookingData.department} />
            <SummaryItem icon="🎭" label="Event" value={bookingData.eventName} />
            <SummaryItem icon="🎟️" label="Tickets" value={`${bookingData.tickets} ticket${bookingData.tickets > 1 ? 's' : ''}`} />
            <SummaryItem icon="🕐" label="Booked At" value={bookingData.bookingTime} />
          </div>

          <div className="summary-total">
            <span>Total Amount Paid</span>
            <span className="total-highlight">₹{bookingData.totalAmount}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="confirmation-actions">
          <button onClick={onReset} className="btn-book-more">
            <span>+</span> Book More Tickets
          </button>
          <button onClick={() => window.print()} className="btn-download">
            🖨️ Print Receipt
          </button>
        </div>
      </div>
    </div>
  )
}

function SummaryItem({ icon, label, value }) {
  return (
    <div className="summary-item">
      <div className="summary-item-label">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="summary-item-value">{value}</div>
    </div>
  )
}

export default BookingConfirmation
