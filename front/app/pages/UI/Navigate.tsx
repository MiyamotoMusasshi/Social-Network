import "app/pages/styles/navigate.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Navigate() {
  const [uid, setUid] = useState<string | undefined>(undefined);
  useEffect(() => {
    setUid(Cookies.get("UID"));
  }, []);
  return (
    <nav>
      <ul>
        {links.map(({ href, to, key }) => (
          <li key={key} className="mb-[10px] hover:opacity-[0.7]">
            <a href={key == 0 ? href + uid : href} className="text-xl">
              {to}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const links = [
  {
    href: `/profile/`,
    to: "Profile",
    key: 0,
  },
  {
    href: "/",
    to: "Home",
    key: 1,
  },
  {
    href: "/chats",
    to: "Chats",
    key: 2,
  },
  {
    href: "/",
    to: "Friends",
    key: 3,
  },
  {
    href: "/",
    to: "Communities",
    key: 4,
  },
];
