function Footer() {
  return (
    <footer className="relative flex flex-col gap-4 bg-primary px-2 py-8 text-center">
      <div className="bg-shadow absolute -top-4 left-0 z-10 hidden h-10 w-full -scale-y-100 lg:block" />
      <p>
        &copy; {new Date().getFullYear()} Algorithm Visualizer by Hayyan Haider
      </p>
      <div className="flex justify-center gap-4">
        <a href="https://www.linkedin.com/in/hayyan-haider/" target="_blank">
          <img
            src="https://skillicons.dev/icons?i=linkedin"
            className="w-8 cursor-pointer"
          />
        </a>
        <a href="https://github.com/hayyanhaider0" target="_blank">
          <img
            src="https://skillicons.dev/icons?i=github"
            className="w-8 cursor-pointer"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
