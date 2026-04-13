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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    tickets: ''
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }

    if (!formData.tickets.trim()) {
      newErrors.tickets = 'Number of tickets is required'
    } else {
      const numTickets = parseInt(formData.tickets)
      if (isNaN(numTickets) || numTickets <= 0) {
        newErrors.tickets = 'Number of tickets must be a positive number'
      } else if (numTickets > availableTickets) {
        newErrors.tickets = `Only ${availableTickets} tickets available`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const newErrors = { ...errors }
      if (name === 'name' && !value.trim()) {
        newErrors.name = 'Name is required'
      } else if (name === 'email') {
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
      } else if (name === 'department' && !value.trim()) {
        newErrors.department = 'Department is required'
      } else if (name === 'tickets') {
        if (!value.trim()) {
          newErrors.tickets = 'Number of tickets is required'
        } else {
          const numTickets = parseInt(value)
          if (isNaN(numTickets) || numTickets <= 0) {
            newErrors.tickets = 'Number of tickets must be a positive number'
          } else if (numTickets > availableTickets) {
            newErrors.tickets = `Only ${availableTickets} tickets available`
          } else {
            delete newErrors.tickets
          }
        }
      } else {
        delete newErrors[name]
      }
      setErrors(newErrors)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, department: true, tickets: true })
    if (validateForm()) {
      onBook(formData)
    }
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', department: '', tickets: '' })
    setErrors({})
    setTouched({})
  }

  const calculatedTotal = formData.tickets && !errors.tickets
    ? parseInt(formData.tickets) * ticketPrice
    : 0

  return (
    <div className="booking-form-container">
      <h2>Book Your Tickets</h2>
      <form onSubmit={handleSubmit} className="booking-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            className={errors.name && touched.name ? 'input-error' : ''}
          />
          {errors.name && touched.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email address"
            className={errors.email && touched.email ? 'input-error' : ''}
          />
          {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.department && touched.department ? 'input-error' : ''}
          >
            <option value="">Select your department</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && touched.department && <span className="error-message">{errors.department}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="tickets">Number of Tickets</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter number of tickets"
            min="1"
            max={availableTickets}
            className={errors.tickets && touched.tickets ? 'input-error' : ''}
          />
          {errors.tickets && touched.tickets && <span className="error-message">{errors.tickets}</span>}
        </div>

        {formData.tickets && !errors.tickets && (
          <div className="total-amount">
            <strong>Total Amount: Rs. {calculatedTotal}</strong>
          </div>
        )}

        <div className="form-buttons">
          <button type="submit" className="btn-submit">Book Tickets</button>
          <button type="button" onClick={handleReset} className="btn-reset">Reset</button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
