import app from "./app.ts";
import registration from "./posts/registration.ts";
import authorization from "./posts/authorization.ts";
import checkCookie from "./posts/checkCookie.ts";
import loadingProfile from "./posts/loadingProfile.ts";
import { Following } from "./posts/following.ts";

app.post("/register", registration);
app.post("/login", authorization);
app.post("/check-cookie", checkCookie);
app.post("/loading-profile", loadingProfile);
app.post("/follow", Following.follow);
app.post("/un-follow", Following.unFollow);

export default app.post;
