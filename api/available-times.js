export default async function handler(req, res) {
    const { date } = req.query;
  
    // Ensure date is provided
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }
  
    const availableTimes = [
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', 
      '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', 
      '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
    ];
  
    // Get the booked times for the selected date
    const bookedTimes = bookings.filter((booking) => booking.date === date).map((booking) => booking.time);
  
    // Filter out the booked times from the available times
    const availableSlots = availableTimes.filter((time) => !bookedTimes.includes(time));
  
    res.json({ availableSlots });
  }
  