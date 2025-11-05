import app from "./app.ts";
import registration from "./posts/registration.ts";
import authorization from "./posts/authorization.ts";
import checkCookie from "./posts/checkCookie.ts";

app.post("/register", registration);
app.post("/login", authorization);
app.post("/check-cookie", checkCookie);

export default app.post;
