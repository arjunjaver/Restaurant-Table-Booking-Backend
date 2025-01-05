let bookings = [];

export default async function handler(req, res) {
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
    .filter((booking) => booking.date === date)
    .map((booking) => booking.time);

  const availableSlots = availableTimes.filter((time) => !bookedTimes.includes(time));

  return res.json({ availableSlots });
}
