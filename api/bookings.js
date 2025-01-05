let bookings = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { date, time, guests, name, contact } = req.body;

    if (!date || !time || !guests || !name || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingBooking = bookings.find(
      (booking) => booking.date === date && booking.time === time
    );
    if (existingBooking) {
      return res.status(400).json({ error: 'Time slot already booked' });
    }

    const newBooking = { id: bookings.length + 1, date, time, guests, name, contact };
    bookings.push(newBooking);

    return res.status(201).json(newBooking);
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
