exports.handler = async () => {
  try {
    const FUDO_API_BASE = (process.env.FUDO_API_BASE || "").replace(/\/$/, "");
    const FUDO_TOKEN = process.env.FUDO_TOKEN;

    if (!FUDO_API_BASE) {
      throw new Error("Falta FUDO_API_BASE");
    }

    if (!FUDO_TOKEN) {
      throw new Error("Falta FUDO_TOKEN");
    }

    const url = `${FUDO_API_BASE}/sales`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${FUDO_TOKEN}`,
        "X-Authorization": `Bearer ${FUDO_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();

    return {
      statusCode: res.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        url,
        status: res.status,
        body: text,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};