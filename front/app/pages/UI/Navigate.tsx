import "app/pages/styles/navigate.css";

export default function Navigate() {
  return (
    <nav>
      <ul>
        {links.map(({ href, to, key }) => (
          <li key={key} className="mb-[10px]">
            <a href={href} className="text-2xl">
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
    href: "/",
    to: "Profile",
    key: 0,
  },
  {
    href: "/",
    to: "Home",
    key: 1,
  },
  {
    href: "/",
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
