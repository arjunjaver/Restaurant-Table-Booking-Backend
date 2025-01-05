import fs from 'fs';
import path from 'path';

const bookingsFilePath = path.resolve('data', 'bookings.json');

// Load bookings from the file
const loadBookings = () => {
  try {
    const data = fs.readFileSync(bookingsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Save bookings to the file
const saveBookings = (bookings) => {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { date, time, guests, name, contact } = req.body;

    if (!date || !time || !guests || !name || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const bookings = loadBookings();

    const existingBooking = bookings.find(
      (booking) => booking.date === date && booking.time === time
    );
    if (existingBooking) {
      return res.status(400).json({ error: 'Time slot already booked' });
    }

    const newBooking = { id: bookings.length + 1, date, time, guests, name, contact };
    bookings.push(newBooking);

    saveBookings(bookings);

    return res.status(201).json(newBooking);
  } else if (req.method === 'GET') {
    const bookings = loadBookings();
    return res.status(200).json(bookings);
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
