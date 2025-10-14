import app from "./app.ts";

app.post("/register", (req, res) => {
  console.log(req.body);
  setTimeout(() => res.json({ user: "lox" }), 10000);
});

export default app.post;
