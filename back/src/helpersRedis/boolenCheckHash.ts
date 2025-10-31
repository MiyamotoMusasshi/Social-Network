import { redisClient } from "../redis.ts";

export default function boolenCheckHash(name: string): Promise<any> {
  return new Promise((resolve, _reject) => {
    redisClient.hGetAll(name).then((res) => {
      resolve(Object.keys(res).length != 0);
    });
  });
}
