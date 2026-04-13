import { useState } from 'react'
import EventDetails from './components/EventDetails'
import BookingForm from './components/BookingForm'
import BookingConfirmation from './components/BookingConfirmation'
import './App.css'

const eventData = {
  name: 'Tech Fest 2026',
  department: 'Computer Science & Engineering',
  date: 'April 25, 2026',
  time: '10:00 AM – 5:00 PM',
  venue: 'Main Auditorium, Block A',
  ticketPrice: 150,
  availableTickets: 100,
  totalCapacity: 100,
  category: 'Technical',
  organizer: 'AVN College of Engineering'
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
      tickets: parseInt(formData.tickets),
      bookingId: `TF2026-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      bookingTime: new Date().toLocaleString('en-IN')
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
      {/* Animated background */}
      <div className="bg-scene">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="bg-grid" />
      </div>

      <header className="app-header">
        <div className="header-badge">
          <span className="badge-dot" />
          Live Event Registration
        </div>
        <h1>Event Ticket Booking</h1>
        <p className="header-subtitle">AVN College of Engineering — Internal Department Event</p>
      </header>

      <main className="app-main">
        <EventDetails
          event={eventData}
          availableTickets={availableTickets}
        />

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
        <p>© 2026 <strong>AVN College of Engineering</strong> — Tech Fest · All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default App
