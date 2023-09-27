import Link from 'next/link';

type PropTypes = {
  path: string;
  icon: React.ReactNode;
  text: string;
};

export const NavbarItemLink = ({ path, icon, text }: PropTypes) => {
  return (
    <li>
      <Link
        href={path}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
};
