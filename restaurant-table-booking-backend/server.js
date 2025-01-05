const express = require('express');
const app = express();
const PORT = 5000;

const cors = require('cors');
app.use(cors()); 

app.use(express.json());  

let bookings = [];  


app.post('/api/bookings', (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  console.log('Received data:', req.body);
  

  if (!date || !time || !guests || !name || !contact) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  

  const existingBooking = bookings.find(booking => booking.date === date && booking.time === time);
  if (existingBooking) {
    return res.status(400).json({ error: 'Time slot already booked' });
  }


  const newBooking = { id: bookings.length + 1, date, time, guests, name, contact };
  bookings.push(newBooking);
  
  res.status(201).json(newBooking);
});


app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});



app.get('/api/available-times', (req, res) => {
  const { date } = req.query;


  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }


  const availableTimes = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', 
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', 
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
        
  ];


  const bookedTimes = bookings
    .filter(booking => booking.date === date)
    .map(booking => booking.time);

 
  const availableSlots = availableTimes.filter(time => !bookedTimes.includes(time));

 
  res.json({ availableSlots });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
