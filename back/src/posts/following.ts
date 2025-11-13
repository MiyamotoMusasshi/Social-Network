import push from "../helpersDataBase/push.ts";
import deleteStr from "../helpersDataBase/deleteStr.ts";
import editValue from "../helpersDataBase/editValue.ts";
import check from "../helpersDataBase/check.ts";
import type { Request, Response } from "express";

export class Following {
  static async follow(request: Request, responce: Response) {
    const { forFollow, newFollowers } = request.body;

    push("`" + forFollow + "`", ["followers"], [newFollowers]);

    const lastCountFollowers = await check(
      "users",
      "followers",
      "id",
      forFollow
    );
    const lastCountFollowing = await check(
      "users",
      "following",
      "id",
      newFollowers
    );

    editValue(
      "users",
      "followers",
      "id",
      lastCountFollowers.followers == null
        ? 1
        : lastCountFollowers.followers + 1,
      Number(forFollow)
    );
    editValue(
      "users",
      "following",
      "id",
      lastCountFollowing.following == null
        ? 1
        : lastCountFollowing.following + 1,
      Number(newFollowers)
    );
  }
  static async unFollow(request: Request, responce: Response) {
    const { unFollow, leftFollowers } = request.body;

    deleteStr("`" + unFollow + "`", "followers", leftFollowers);

    const lastCountFollowers = await check(
      "users",
      "followers",
      "id",
      unFollow
    );
    const lastCountFollowing = await check(
      "users",
      "following",
      "id",
      leftFollowers
    );

    editValue(
      "users",
      "followers",
      "id",
      lastCountFollowers.followers == null
        ? 1
        : lastCountFollowers.followers - 1,
      Number(unFollow)
    );
    editValue(
      "users",
      "following",
      "id",
      lastCountFollowing.following == null
        ? 1
        : lastCountFollowing.following - 1,
      Number(leftFollowers)
    );
  }
}
