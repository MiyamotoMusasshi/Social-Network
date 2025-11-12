import app from "./app.ts";
import registration from "./posts/registration.ts";
import authorization from "./posts/authorization.ts";
import checkCookie from "./posts/checkCookie.ts";
import loadingProfile from "./posts/loadingProfile.ts";

app.post("/register", registration);
app.post("/login", authorization);
app.post("/check-cookie", checkCookie);
app.post("/loading-profile", loadingProfile);

export default app.post;
