import emailjs from '@emailjs/browser';

/**
 * Get EmailJS environment keys, supporting multiple naming conventions.
 */
export function getEmailConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.VITE_EMAIL_SERVICE_ID || '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.VITE_EMAIL_TEMPLATE_ID || '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAIL_SERVICE_PUBLIC_KEY || '';

  const isPlaceholder = (val) =>
    !val ||
    val.includes('your_') ||
    val.includes('placeholder') ||
    val.trim() === '';

  const isConfigured = !isPlaceholder(serviceId) && !isPlaceholder(templateId) && !isPlaceholder(publicKey);

  return {
    serviceId,
    templateId,
    publicKey,
    isConfigured
  };
}

/**
 * Generates a unique, friendly booking reference number.
 * Example: "EV-TR-7482"
 */
export function generateBookingId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `EV-TR-${randomNum}`;
}

/**
 * Persists booking in localStorage for customer records.
 */
export function saveBookingLocally(booking) {
  try {
    const existing = JSON.parse(localStorage.getItem('evista_test_drive_bookings') || '[]');
    existing.unshift(booking);
    localStorage.setItem('evista_test_drive_bookings', JSON.stringify(existing.slice(0, 20)));
  } catch (err) {
    console.warn('Could not save booking locally:', err);
  }
}

/**
 * Format friendly date and time slot.
 */
export function formatBookingSchedule(dateStr, timeSlot) {
  let formattedDate = 'Immediate / Showroom Scheduling';
  if (dateStr) {
    try {
      const d = new Date(dateStr);
      formattedDate = d.toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      formattedDate = dateStr;
    }
  }

  const slotLabels = {
    morning: 'Morning Slot (10:00 AM - 1:00 PM)',
    afternoon: 'Afternoon Slot (1:00 PM - 4:00 PM)',
    evening: 'Evening Slot (4:00 PM - 7:30 PM)',
    anytime: 'Any Available Slot'
  };

  const formattedSlot = slotLabels[timeSlot] || timeSlot || 'Morning Slot (10:00 AM - 1:00 PM)';

  return { formattedDate, formattedSlot };
}

/**
 * Generates a mailto: link for the user's native email client
 */
export function generateMailtoLink(booking) {
  const subject = encodeURIComponent(`Test Drive Confirmation - ${booking.vehicleName} [Ref: ${booking.bookingId}]`);
  const body = encodeURIComponent(
`Hi ${booking.name},

Your EV test drive request has been confirmed!

--- TEST DRIVE DETAILS ---
Booking Reference: ${booking.bookingId}
Vehicle: ${booking.vehicleName} (${booking.brandName || 'Electric Vehicle'})
Date: ${booking.scheduledDate}
Time Slot: ${booking.scheduledSlot}
Location: ${booking.city || 'Authorized EVista Experience Centre'}
Contact Phone: ${booking.phone}

--- REQUIREMENTS FOR TEST RIDE ---
1. Valid Two-Wheeler / Four-Wheeler Driver's License.
2. Standard protective helmet / safety belt.
3. Arrive 10 minutes before your selected slot.

Showroom Helpline: +91 1800 200 4567
Support Email: support@evista.com

We look forward to giving you an electrifying test drive experience!
Team EVista
`
  );

  return `mailto:${booking.email}?subject=${subject}&body=${body}`;
}

/**
 * Sends a test drive confirmation email directly from the frontend.
 * If EmailJS keys are configured, triggers @emailjs/browser API.
 * If not, provides a realistic simulated dispatch with complete digital pass.
 */
export async function sendTestDriveConfirmationEmail(details) {
  const bookingId = details.bookingId || generateBookingId();
  const { formattedDate, formattedSlot } = formatBookingSchedule(details.date, details.time);

  const enrichedBooking = {
    ...details,
    bookingId,
    scheduledDate: formattedDate,
    scheduledSlot: formattedSlot,
    timestamp: new Date().toISOString()
  };

  const { serviceId, templateId, publicKey, isConfigured } = getEmailConfig();

  // Template parameters mapped to standard EmailJS variables with multiple aliases
  const templateParams = {
    to_name: details.name,
    to_email: details.email,
    user_name: details.name,
    user_email: details.email,
    email: details.email,
    reply_to: details.email,
    recipient_email: details.email,
    user_phone: details.phone,
    phone: details.phone,
    user_city: details.city || 'Showroom Preferred',
    booking_id: bookingId,
    vehicle_name: details.vehicleName || 'EV Vehicle',
    vehicle_brand: details.brandName || 'EVista Partner',
    booking_date: formattedDate,
    booking_time: formattedSlot,
    scheduled_slot: formattedSlot,
    interest_type: details.interestType || 'Test Drive',
    showroom_address: 'EVista Flagship Experience Showroom',
    support_phone: '+91 1800 200 4567',
    message: `Test Drive Booking Confirmation for ${details.vehicleName} on ${formattedDate} (${formattedSlot}). Booking Reference: ${bookingId}.`
  };

  if (isConfigured) {
    try {
      console.log('[EVista Email] Dispatching live confirmation email via EmailJS...', {
        to: details.email,
        serviceId,
        templateId
      });
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      saveBookingLocally(enrichedBooking);

      return {
        success: true,
        isRealSend: true,
        bookingId,
        booking: enrichedBooking,
        responseStatus: response.status,
        message: `Confirmation email dispatched directly to ${details.email}!`
      };
    } catch (error) {
      console.error('[EVista Email] EmailJS direct dispatch failed:', error);
      saveBookingLocally(enrichedBooking);
      return {
        success: true,
        isRealSend: false,
        sendError: error?.text || error?.message || 'Network error communicating with EmailJS',
        bookingId,
        booking: enrichedBooking,
        message: `Booking received! Digital pass generated (EmailJS returned: ${error?.text || error?.message})`
      };
    }
  } else {
    // Simulated frontend dispatch (development / demo mode)
    console.warn(
      '[EVista Email] EmailJS keys are missing or empty in environment variables.',
      'Running in Digital Pass Preview Mode. To deliver real emails to inboxes, set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env and Vercel.'
    );
    await new Promise((resolve) => setTimeout(resolve, 850));
    saveBookingLocally(enrichedBooking);

    return {
      success: true,
      isRealSend: false,
      isSimulated: true,
      bookingId,
      booking: enrichedBooking,
      message: `Test drive booked! A confirmation email pass was generated for ${details.email}.`
    };
  }
}
