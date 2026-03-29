const { google } = require("googleapis");

exports.handler = async () => {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      throw new Error("Falta GOOGLE_SERVICE_ACCOUNT_EMAIL");
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("Falta GOOGLE_PRIVATE_KEY");
    }

    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      throw new Error("Falta GOOGLE_SPREADSHEET_ID");
    }

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    await auth.authorize();

    const sheets = google.sheets({
      version: "v4",
      auth
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
range: "'Reporte Semanal Ventas - Primero Cafe'!A1",
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
      body: err.message || "Error desconocido"
    };
  }
};