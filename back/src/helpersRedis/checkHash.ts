import { redisClient } from "../redis.ts";

export default function checkHash(name: string): Promise<any> {
  return new Promise((resolve, _reject) => {
    redisClient.hGetAll(name).then((res) => {
      resolve(res);
    });
  });
}
