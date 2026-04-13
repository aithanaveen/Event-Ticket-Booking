import { useState } from 'react'
import EventDetails from './components/EventDetails'
import BookingForm from './components/BookingForm'
import BookingConfirmation from './components/BookingConfirmation'
import './App.css'

const eventData = {
  name: 'Tech Fest 2026',
  department: 'Computer Science & Engineering',
  date: 'April 25, 2026',
  time: '10:00 AM - 5:00 PM',
  venue: 'Main Auditorium, Block A',
  ticketPrice: 150,
  availableTickets: 100
}

function App() {
  const [availableTickets, setAvailableTickets] = useState(eventData.availableTickets)
  const [bookingData, setBookingData] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleBooking = (formData) => {
    const totalAmount = formData.tickets * eventData.ticketPrice
    const bookingDetails = {
      ...formData,
      eventName: eventData.name,
      totalAmount,
      tickets: parseInt(formData.tickets)
    }
    setBookingData(bookingDetails)
    setAvailableTickets(prev => prev - parseInt(formData.tickets))
    setShowConfirmation(true)
  }

  const handleReset = () => {
    setBookingData(null)
    setShowConfirmation(false)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Event Ticket Booking</h1>
        <p>AVN College of Engineering</p>
      </header>

      <main className="app-main">
        <EventDetails event={eventData} availableTickets={availableTickets} />

        {!showConfirmation ? (
          <BookingForm
            onBook={handleBooking}
            availableTickets={availableTickets}
            ticketPrice={eventData.ticketPrice}
          />
        ) : (
          <BookingConfirmation bookingData={bookingData} onReset={handleReset} />
        )}
      </main>

      <footer className="app-footer">
        <p>AVN College of Engineering - Internal Department Event - Tech Fest 2026</p>
      </footer>
    </div>
  )
}

export default App
