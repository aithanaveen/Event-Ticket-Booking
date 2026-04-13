import './EventDetails.css'

function EventDetails({ event, availableTickets }) {
  const soldPercent = Math.round(((event.totalCapacity - availableTickets) / event.totalCapacity) * 100)
  const isLow = availableTickets < 20
  const isCritical = availableTickets < 10

  return (
    <div className="event-details">
      <div className="event-card">

        {/* Top badge */}
        <div className="event-tag">
          <span className="tag-icon">🎓</span>
          <span>{event.category} Event</span>
        </div>

        <div className="event-name">{event.name}</div>
        <div className="event-organizer">Organized by {event.organizer}</div>

        {/* Info grid */}
        <div className="event-grid">
          <div className="event-grid-item">
            <span className="grid-icon">🏬</span>
            <div>
              <div className="grid-label">Department</div>
              <div className="grid-value">{event.department}</div>
            </div>
          </div>
          <div className="event-grid-item">
            <span className="grid-icon">📅</span>
            <div>
              <div className="grid-label">Date</div>
              <div className="grid-value">{event.date}</div>
            </div>
          </div>
          <div className="event-grid-item">
            <span className="grid-icon">⏰</span>
            <div>
              <div className="grid-label">Time</div>
              <div className="grid-value">{event.time}</div>
            </div>
          </div>
          <div className="event-grid-item">
            <span className="grid-icon">📍</span>
            <div>
              <div className="grid-label">Venue</div>
              <div className="grid-value">{event.venue}</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="event-divider" />

        {/* Ticket stats */}
        <div className="ticket-stats">
          <div className="ticket-price-tag">
            <span className="price-label">Per Ticket</span>
            <span className="price-value">₹{event.ticketPrice}</span>
          </div>
          <div className="ticket-availability">
            <div className="avail-header">
              <span className="avail-label">Availability</span>
              <span className={`avail-count ${isCritical ? 'critical' : isLow ? 'low' : ''}`}>
                {availableTickets} / {event.totalCapacity} remaining
                {isCritical && ' 🔴'}
                {!isCritical && isLow && ' 🟡'}
              </span>
            </div>
            <div className="progress-bar-wrap">
              <div
                className={`progress-bar-fill ${isCritical ? 'critical' : isLow ? 'low' : ''}`}
                style={{ width: `${Math.max(2, 100 - soldPercent)}%` }}
              />
            </div>
            <div className="progress-labels">
              <span>{soldPercent}% sold</span>
              <span>{availableTickets === 0 ? 'SOLD OUT' : 'Available'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
