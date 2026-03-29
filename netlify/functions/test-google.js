const { google } = require("googleapis");

exports.handler = async () => {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "Semanal!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["OK CONECTADO 🚀"]]
      }
    });

    return {
      statusCode: 200,
      body: "OK - escribió en Google Sheets"
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};