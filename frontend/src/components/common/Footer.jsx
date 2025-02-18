function Footer() {
  return (
    <footer className="flex flex-col gap-4 bg-primary px-2 py-8 text-center">
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
