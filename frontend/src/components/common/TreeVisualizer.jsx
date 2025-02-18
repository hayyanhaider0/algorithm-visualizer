import TreeRenderer from "./TreeRenderer";

const TreeVisualizer = ({ root }) => {
  return (
    <div className="gridded-background h-96 items-center justify-center">
      <div className="custom-scrollbar flex h-full w-full justify-center gap-1 overflow-x-scroll px-8 pt-4">
        {/* Animated Node Structure */}
        <TreeRenderer root={root} />
      </div>
      <hr />
    </div>
  );
};

export default TreeVisualizer;
