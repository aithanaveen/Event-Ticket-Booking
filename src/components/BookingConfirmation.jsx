import './BookingConfirmation.css'

function BookingConfirmation({ bookingData, onReset }) {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">&#10004;</div>
        <h2>Booking Confirmed!</h2>
        <p className="success-message">Your tickets have been booked successfully.</p>

        <div className="booking-summary">
          <h3>Booking Summary</h3>
          <div className="summary-row">
            <span>Name:</span>
            <span>{bookingData.name}</span>
          </div>
          <div className="summary-row">
            <span>Email:</span>
            <span>{bookingData.email}</span>
          </div>
          <div className="summary-row">
            <span>Department:</span>
            <span>{bookingData.department}</span>
          </div>
          <div className="summary-row">
            <span>Event:</span>
            <span>{bookingData.eventName}</span>
          </div>
          <div className="summary-row">
            <span>Tickets Booked:</span>
            <span>{bookingData.tickets}</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount Paid:</span>
            <span>Rs. {bookingData.totalAmount}</span>
          </div>
        </div>

        <button onClick={onReset} className="btn-new-booking">
          Book More Tickets
        </button>
      </div>
    </div>
  )
}

export default BookingConfirmation
