import app from "./app.ts";
import registration from "./posts/registration.ts";

app.post("/register", registration);

export default app.post;
