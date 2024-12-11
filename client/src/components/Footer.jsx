import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="px-6 py-4 mx-auto bg-white">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">© 2024 Necklace Paradise</p>

          <div className="flex mt-3 -mx-2 sm:mt-0 items-center">
            <a
              href="/aboutme"
              className="mx-5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              About Me{" "}
            </a>
            <Link to="https://buymeacoffee.com/rakeshkumawat">
              <img
                className="h-8"
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me a Coffee"
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
