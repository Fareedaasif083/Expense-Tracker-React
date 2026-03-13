// export default async function handler(req, res) {

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { message, expenses } = req.body;

//   const summary = expenses
//     .map(e => `${e.title} ${e.amount} ${e.category}`)
//     .join(", ");

//   const prompt = `
// User expenses: ${summary}

// User question: ${message}

// Give short helpful advice about the user's spending.
// `;

//   // const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
//   //   },
//   //   body: JSON.stringify({
//   //     model: "llama3-8b-8192",
//   //     messages: [
//   //       { role: "user", content: prompt }
//   //     ]
//   //   })
//   // });

//   // const data = await response.json();

//   // res.status(200).json({
//   //   reply: data.choices[0].message.content
//   // });
//    try {
//   const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "llama3-8b-8192",
//       messages: [{ role: "user", content: prompt }]
//     })
//   });

//   const data = await response.json();
//   console.log("Groq response:", data);

//   res.status(200).json({
//     reply: data?.choices?.[0]?.message?.content || "No reply from Groq"
//   });

// } catch (error) {
//   console.error("AI API error:", error);
//   res.status(500).json({ error: "AI API failed" });
// }
//   const data = await response.json();
//   console.log("Groq response:", data);
//   res.status(200).json({
//   reply: data?.choices?.[0]?.message?.content || "Sorry, I could not get a response."
// });
// }
export default async function handler(req, res) {
  console.log("Message received:", req.body.message); 

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, expenses } = req.body;

  const summary = expenses
    .map(e => `${e.title} ${e.amount} ${e.category}`)
    .join(", ");

  const prompt = `
User expenses: ${summary}

User question: ${message}

Give short helpful advice about the user's spending.
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    console.log("Groq response:", data);

    res.status(200).json({
      reply: data?.choices?.[0]?.message?.content || "No reply from Groq"
    });

  } catch (error) {
    console.error("AI API error:", error);
    res.status(500).json({ error: "AI API failed" });
  }
}
