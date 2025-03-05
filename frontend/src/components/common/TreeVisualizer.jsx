import TreeRenderer from "./TreeRenderer";
import { useRef, useEffect } from "react";

const TreeVisualizer = ({ root }) => {
  const scrollContainerRef = useRef(null);
  const extraLeftPadding = 80; // extra left padding in pixels

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Center the scroll by setting scrollLeft to half the extra scrollable width
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2 - extraLeftPadding;
    }
  }, [root]);

  return (
    <div className="gridded-background h-96 items-center justify-center">
      <div
        ref={scrollContainerRef}
        style={{ paddingLeft: `${extraLeftPadding}px` }}
        className="custom-scrollbar flex h-full w-full justify-center gap-1 overflow-x-scroll px-8 pt-4"
      >
        {/* Animated Node Structure */}
        <TreeRenderer root={root} />
      </div>
      <hr />
    </div>
  );
};

export default TreeVisualizer;
