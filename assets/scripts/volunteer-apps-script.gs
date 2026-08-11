// Google Apps Script template for the volunteer form
// 1. Create a new Apps Script project at https://script.google.com
// 2. Paste this code into the script editor
// 3. Replace SHEET_ID and EMAIL_ADDRESS below
// 4. Deploy as a Web App: Execute as me, Who has access: Anyone

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const sheet = SpreadsheetApp.openById('SHEET_ID').getSheetByName('Volunteer Forms');

    const row = [
      new Date(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.dob || '',
      data.address || '',
      data.country || '',
      data.company || '',
      data.position || '',
      data.department || '',
      data.skills || '',
      data.experience || '',
      data.days ? data.days.join(', ') : '',
      data.hoursPerWeek || '',
      data.startDate || '',
      data.cv || '',
      data.portfolio || '',
      data.comments || '',
      data.policies || ''
    ];

    sheet.appendRow(row);

    const applicantEmail = data.email || 'starlightwomen21@gmail.com';
    const orgEmail = 'starlightwomen21@gmail.com';

    const applicantSubject = 'We received your volunteer application';
    const applicantBody = [
      'Thank you for volunteering with Starlight Women.',
      '',
      'We have received your application and will review it shortly.',
      '',
      'Best regards,',
      'Starlight Women'
    ].join('\n');

    const orgSubject = 'New volunteer application received';
    const orgBody = [
      'A new volunteer application was submitted.',
      '',
      'Name: ' + (data.firstName || '') + ' ' + (data.lastName || ''),
      'Email: ' + (data.email || ''),
      'Phone: ' + (data.phone || ''),
      'Department: ' + (data.department || ''),
      'Availability: ' + (data.days ? data.days.join(', ') : ''),
      '',
      'Please review the Google Sheet for full details.'
    ].join('\n');

    MailApp.sendEmail(applicantEmail, applicantSubject, applicantBody);
    MailApp.sendEmail(orgEmail, orgSubject, orgBody);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Volunteer form endpoint is ready.').setMimeType(ContentService.MimeType.TEXT);
}
