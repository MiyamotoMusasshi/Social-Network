import app from "./app.ts";
import registration from "./posts/registration.ts";
import authorization from "./posts/authorization.ts";

app.post("/register", registration);
app.post("/login", authorization);

export default app.post;
