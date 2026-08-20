const CONFIG = {
  ADMIN_EMAIL: 'admin@cltindia.org',
  SENDER_NAME: 'CLT India',
  SHEET_NAMES: ['Contacts', 'Volunteers', 'Newsletter', 'Donations', 'Partners', 'Careers', 'JobPostings'],
  COLUMNS: {
    Contacts: ['Timestamp', 'Name', 'Email', 'Subject', 'Message'],
    Volunteers: ['Timestamp', 'Name', 'Email', 'Phone', 'City', 'Interest', 'Availability', 'Message'],
    Newsletter: ['Timestamp', 'Email'],
    Donations: ['Timestamp', 'Name', 'Email', 'Phone', 'Amount', 'PaymentID'],
    Partners: ['Timestamp', 'Organization', 'Name', 'Email', 'Phone', 'PartnershipType', 'Message'],
    Careers: ['Timestamp', 'Name', 'Email', 'Phone', 'Position', 'Experience', 'Message', 'ResumeLink'],
    JobPostings: ['ID', 'PostedDate', 'Title', 'Department', 'Location', 'Type', 'Experience', 'Description', 'Responsibilities', 'Requirements', 'Status']
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
      case 'career': result = handleCareer(data); break;
      case 'jobpost': result = handleJobPost(data); break;
      case 'jobdelete': result = handleJobDelete(data); break;
      default: throw new Error('Unknown form type: ' + type);
    }

    return jsonResponse({ success: true, message: result });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
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

function handleCareer(data) {
  const sheet = getSheet('Careers');

  let resumeLink = '';
  if (data.resumeData && data.resumeName) {
    try {
      const bytes = Utilities.base64Decode(data.resumeData, Utilities.Charset.UTF_8);
      const blob = Utilities.newBlob(bytes, data.resumeType || 'application/pdf', data.resumeName);
      const folder = DriveApp.getFoldersByName('Career Resumes').hasNext()
        ? DriveApp.getFoldersByName('Career Resumes').next()
        : DriveApp.createFolder('Career Resumes');
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      resumeLink = file.getUrl();
    } catch (err) {
      resumeLink = 'Resume save failed: ' + err.message;
    }
  }

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.phone,
    data.position,
    data.experience,
    data.message,
    resumeLink
  ]);

  sendAutoReply(data.email, 'Job Application Received - CLT India',
    `Dear ${data.name},\n\nThank you for applying for the ${data.position} position at CLT India.\n\nWe have received your application and resume. Our team will review your profile and contact you if your qualifications match our requirements.\n\nRegards,\nCLT India Team`);

  sendAdminNotification('New Job Application',
    `Position: ${data.position}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nExperience: ${data.experience}\nMessage: ${data.message}\nResume: ${resumeLink || 'Not attached'}`);

  return 'Application submitted successfully';
}

function sendAutoReply(to, subject, body) {
  GmailApp.sendEmail({
    to: to,
    subject: subject,
    body: body,
    name: CONFIG.SENDER_NAME
  });
}

function sendAdminNotification(subject, body) {
  GmailApp.sendEmail({
    to: CONFIG.ADMIN_EMAIL,
    subject: subject,
    body: body,
    name: CONFIG.SENDER_NAME
  });
}

function getJobsJson() {
  const sheet = getSheet('JobPostings');
  const values = sheet.getDataRange().getValues();
  const jobs = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row[2]) continue;
    if (String(row[10]).toLowerCase() === 'inactive') continue;
    jobs.push({
      id: row[0],
      title: row[2],
      department: row[3],
      location: row[4],
      type: row[5],
      experience: row[6],
      description: row[7],
      responsibilities: String(row[8]).split('\n').filter(function (s) { return s.trim(); }),
      requirements: String(row[9]).split('\n').filter(function (s) { return s.trim(); })
    });
  }
  return jobs;
}

function handleJobPost(data) {
  const sheet = getSheet('JobPostings');
  const id = 'JOB-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  sheet.appendRow([
    id, new Date(), data.title, data.department, data.location, data.jobType,
    data.experience, data.description, data.responsibilities, data.requirements, 'Active'
  ]);
  sendAdminNotification('New Job Posted on Website', `Position: ${data.title}\nDepartment: ${data.department}\nLocation: ${data.location}`);
  return 'Job posted successfully';
}

function handleJobDelete(data) {
  const sheet = getSheet('JobPostings');
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      sheet.getRange(i + 1, 11).setValue('Inactive');
      return 'Job removed successfully';
    }
  }
  throw new Error('Job not found');
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'getJobs') {
    const jobs = getJobsJson();
    const callback = e.parameter.callback || '';
    const out = callback ? callback + '(' + JSON.stringify(jobs) + ')' : JSON.stringify(jobs);
    return ContentService
      .createTextOutput(out)
      .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
  }
  return ContentService
    .createTextOutput('CLT India Form Handler is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
