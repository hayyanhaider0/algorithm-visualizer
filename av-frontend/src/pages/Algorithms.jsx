import AlgorithmSection from "../components/AlgorithmSection";
import { algorithmsData } from "../data/algorithmsData";

const Algorithms = () => {
  return (
    <div className="gridded-background flex flex-col items-center">
      <div className="flex flex-col gap-6 bg-primary p-12 text-center">
        <h1>Algorithms</h1>
        <p className="text-lg">
          Welcome to the Algorithms page, where you can explore and visualize
          various algorithms in action! Whether you're learning the basics of
          sorting, searching, or graph algorithms, this interactive platform
          makes it easy to understand how each algorithm works, step by step.
          <br />
          <br />
          <strong>What You'll Find Here:</strong>
          <br />
          <br />
          <strong>Lists</strong>: Explore algorithms that deal with data
          structures like arrays, linked lists, and more. <br />
          <br />
          <strong>Trees</strong>: Learn about tree-based algorithms such as
          binary trees, AVL trees, and more. <br />
          <br />
          <strong>Graphs</strong>: Discover graph algorithms like Depth-First
          Search (DFS), Breadth-First Search (BFS), and Dijkstra’s. <br />
          <br />
          <strong>Searching Algorithms</strong>: Visualize how Binary Search,
          Linear Search, and Jump Search work. <br />
          <br />
          <strong>Sorting Algorithms</strong>: Understand how Quick Sort, Merge
          Sort, and Bubble Sort organize data efficiently.
        </p>
      </div>

      <AlgorithmSection algorithms={algorithmsData} />
    </div>
  );
};

export default Algorithms;
