const CONFIG = {
  ADMIN_EMAIL: 'admin@cltindia.org',
  SHEET_NAMES: ['Contacts', 'Volunteers', 'Newsletter', 'Donations', 'Partners'],
  COLUMNS: {
    Contacts: ['Timestamp', 'Name', 'Email', 'Subject', 'Message'],
    Volunteers: ['Timestamp', 'Name', 'Email', 'Phone', 'City', 'Interest', 'Availability', 'Message'],
    Newsletter: ['Timestamp', 'Email'],
    Donations: ['Timestamp', 'Name', 'Email', 'Phone', 'Amount', 'PaymentID'],
    Partners: ['Timestamp', 'Organization', 'Name', 'Email', 'Phone', 'PartnershipType', 'Message']
  }
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type;

    let result;
    switch (type) {
      case 'contact': result = handleContact(data); break;
      case 'volunteer': result = handleVolunteer(data); break;
      case 'newsletter': result = handleNewsletter(data); break;
      case 'donation': result = handleDonation(data); break;
      case 'partner': result = handlePartner(data); break;
      default: throw new Error('Unknown form type: ' + type);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(CONFIG.COLUMNS[name]);
  }
  return sheet;
}

function handleContact(data) {
  const sheet = getSheet('Contacts');
  sheet.appendRow([new Date(), data.name, data.email, data.subject, data.message]);

  sendAutoReply(data.email, 'Contact Confirmation',
    `Dear ${data.name},\n\nThank you for reaching out to CLT India.\nWe have received your message and will get back to you within 2-3 business days.\n\nRegards,\nCLT India Team`);

  sendAdminNotification('New Contact Form Submission',
    `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}`);

  return 'Message saved successfully';
}

function handleVolunteer(data) {
  const sheet = getSheet('Volunteers');
  sheet.appendRow([new Date(), data.name, data.email, data.phone, data.city, data.interest, data.availability, data.message]);

  sendAutoReply(data.email, 'Volunteer Registration Confirmation',
    `Dear ${data.name},\n\nThank you for registering as a volunteer with CLT India.\nWe will review your application and reach out to you shortly with opportunities that match your interests.\n\nRegards,\nCLT India Team`);

  sendAdminNotification('New Volunteer Registration',
    `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCity: ${data.city}\nInterest: ${data.interest}\nAvailability: ${data.availability}\nMessage: ${data.message}`);

  return 'Volunteer registration saved';
}

function handleNewsletter(data) {
  const sheet = getSheet('Newsletter');

  const existing = sheet.getDataRange().getValues();
  const alreadySubscribed = existing.some(row => row[1] && row[1].toString().toLowerCase() === data.email.toLowerCase());
  if (alreadySubscribed) return 'Email already subscribed';

  sheet.appendRow([new Date(), data.email]);

  sendAutoReply(data.email, 'Newsletter Subscription Confirmed',
    `Thank you for subscribing to CLT India newsletter!\n\nYou will receive updates about our programs, impact stories, and events.\n\nRegards,\nCLT India Team`);

  sendAdminNotification('New Newsletter Subscriber',
    `Email: ${data.email}`);

  return 'Subscription successful';
}

function handleDonation(data) {
  const sheet = getSheet('Donations');
  sheet.appendRow([new Date(), data.name, data.email, data.phone, data.amount, data.paymentId]);

  sendAutoReply(data.email, 'Donation Receipt - CLT India',
    `Dear ${data.name},\n\nThank you for your generous donation of ₹${data.amount} to CLT India.\nPayment ID: ${data.paymentId}\n\nYour contribution helps us provide quality education to underprivileged children.\n\nFor 80G tax exemption certificate, please contact us at admin@cltindia.org.\n\nRegards,\nCLT India Team`);

  sendAdminNotification('New Donation Received',
    `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nAmount: ₹${data.amount}\nPayment ID: ${data.paymentId}`);

  return 'Donation recorded successfully';
}

function handlePartner(data) {
  const sheet = getSheet('Partners');
  sheet.appendRow([new Date(), data.organization, data.name, data.email, data.phone, data.partnershipType, data.message]);

  sendAutoReply(data.email, 'Partnership Inquiry Received - CLT India',
    `Dear ${data.name},\n\nThank you for your interest in partnering with CLT India.\nWe have received your inquiry from ${data.organization} and our team will reach out to you within 2-3 business days.\n\nRegards,\nCLT India Team`);

  sendAdminNotification('New Partnership Inquiry',
    `Organization: ${data.organization}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nPartnership Type: ${data.partnershipType}\nMessage: ${data.message}`);

  return 'Partnership inquiry saved successfully';
}

function sendAutoReply(to, subject, body) {
  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: body
  });
}

function sendAdminNotification(subject, body) {
  MailApp.sendEmail({
    to: CONFIG.ADMIN_EMAIL,
    subject: subject,
    body: body
  });
}

function doGet(e) {
  return ContentService
    .createTextOutput('CLT India Form Handler is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
