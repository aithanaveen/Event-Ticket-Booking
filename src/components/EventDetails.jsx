import './EventDetails.css'

function EventDetails({ event, availableTickets }) {
  return (
    <div className="event-details">
      <h2>Event Details</h2>
      <div className="event-card">
        <div className="event-name">{event.name}</div>
        <div className="event-info">
          <p><strong>Department:</strong> {event.department}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
          <p><strong>Ticket Price:</strong> Rs. {event.ticketPrice}</p>
          <p className={availableTickets < 20 ? 'low-tickets' : ''}>
            <strong>Available Tickets:</strong> {availableTickets}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
