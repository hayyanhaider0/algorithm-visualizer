const Home = () => {
  return (
    <div className="gridded-background flex min-h-[75vh] flex-col gap-8 px-8 py-16 text-center">
      <div className="flex flex-col gap-8">
        <h1>Algorithm Visualizer</h1>
        <p className="text-lg md:text-xl">
          Welcome to the Algorithm Visualizer!
          <br /> Explore and visualize popular algorithms with interactive
          animations.
          <br /> Browse through sorting, search, and graph algorithms, and see
          how they work step-by-step.
          <br /> Get started now and make learning algorithms fun!
        </p>
      </div>
      <div className="flex flex-col items-center gap-8">
        <h2>Tools and Frameworks Used</h2>
        <img src="https://skillicons.dev/icons?i=html,css,js,react,vite,tailwind,spring" />
        <h2>Other Languages</h2>
        <img src="https://skillicons.dev/icons?i=java,python,c,cpp" />
      </div>
    </div>
  );
};

export default Home;
