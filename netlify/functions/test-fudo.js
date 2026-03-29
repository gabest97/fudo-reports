exports.handler = async () => {
  try {
    const res = await fetch("https://api.fu.do/v1alpha1", {
      headers: {
        Authorization: `Bearer ${process.env.FUDO_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const text = await res.text();

    return {
      statusCode: 200,
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};