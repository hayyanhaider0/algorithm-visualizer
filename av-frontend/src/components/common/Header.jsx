import { Link } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Algorithms", path: "/algorithms" },
  ];

  return (
    <header className="bg-primary">
      {/* Desktop Navigation */}
      <nav className="flex justify-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="border-b-2 border-transparent p-6 text-xl transition-colors duration-100 hover:border-secondary hover:text-secondary"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
