import app from "./app.ts";
import registration from "./posts/registration.ts";
import authorization from "./posts/authorization.ts";
import checkCookie from "./posts/checkCookie.ts";
import loadingProfile from "./posts/loadingProfile.ts";
import { Following } from "./posts/following.ts";
import { upload } from "./localStorage.ts";
import changeAvatar from "./posts/changeAvatar.ts";
import changeProfile from "./posts/changeProfile.ts";
import chat from "./posts/chat.ts";
import chats from "./posts/chats.ts";
import loadingFollows from "./posts/loadingFollows.ts";

app.post("/register", registration);
app.post("/login", authorization);
app.post("/check-cookie", checkCookie);
app.post("/loading-profile", loadingProfile);
app.post("/follow", Following.follow);
app.post("/un-follow", Following.unFollow);
app.post("/change-avatar", upload.single("avatar"), changeAvatar);
app.post("/change-profile", changeProfile);
app.post("/chat", chat);
app.post("/chats", chats);
app.post("/loading-follows", loadingFollows);

export default app.post;
