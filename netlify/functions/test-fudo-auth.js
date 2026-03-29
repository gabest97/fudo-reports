exports.handler = async () => {
  try {
    const res = await fetch("https://api.fu.do/v1alpha1/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: process.env.FUDO_API_KEY,
        apiSecret: process.env.FUDO_API_SECRET
      })
    });

    const text = await res.text();

    return {
      statusCode: res.status,
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};