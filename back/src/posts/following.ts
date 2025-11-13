import push from "../helpersDataBase/push.ts";
import deleteStr from "../helpersDataBase/deleteStr.ts";
import database from "../database.ts";
import editValue from "../helpersDataBase/editValue.ts";
import check from "../helpersDataBase/check.ts";
import type { Request, Response } from "express";
import boolenCheck from "../helpersDataBase/boolenCheck.ts";

export class Following {
  static async follow(request: Request, responce: Response) {
    const { forFollow, newFollowers } = request.body;

    push(
      "follow",
      ["uidOnFollow,uidWhoFollow"],
      [Number(forFollow), Number(newFollowers)]
    );

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

    database.query(
      `DELETE FROM follow WHERE uidOnFollow=${unFollow} AND uidWhoFollow=${leftFollowers}`
    );

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
