import React, { useRef, useEffect, useState } from "react";

const TreeRenderer = ({ root }) => {
  if (!root) return null;

  // Refs for the container, parent node, and each child container.
  const containerRef = useRef(null);
  const parentRef = useRef(null);
  const leftChildRef = useRef(null);
  const rightChildRef = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    // Ensure the parent's container exists.
    if (!containerRef.current || !parentRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const parentRect = parentRef.current.getBoundingClientRect();

    // Calculate parent's center (x) and bottom (y) relative to container.
    const parentCenterX =
      parentRect.left + parentRect.width / 2 - containerRect.left;
    const parentBottomY = parentRect.bottom - containerRect.top;
    const newLines = [];

    // Calculate for left child if it exists.
    if (root.left && leftChildRef.current) {
      const leftRect = leftChildRef.current.getBoundingClientRect();
      const leftCenterX =
        leftRect.left + leftRect.width / 2 - containerRect.left;
      const leftTopY = leftRect.top - containerRect.top;
      newLines.push({
        x1: parentCenterX,
        y1: parentBottomY,
        x2: leftCenterX,
        y2: leftTopY,
      });
    }
    // Calculate for right child if it exists.
    if (root.right && rightChildRef.current) {
      const rightRect = rightChildRef.current.getBoundingClientRect();
      const rightCenterX =
        rightRect.left + rightRect.width / 2 - containerRect.left;
      const rightTopY = rightRect.top - containerRect.top;
      newLines.push({
        x1: parentCenterX,
        y1: parentBottomY,
        x2: rightCenterX,
        y2: rightTopY,
      });
    }
    setLines(newLines);
  }, [root]);

  return (
    <span
      ref={containerRef}
      className="relative flex flex-col items-center gap-4"
    >
      <div
        ref={parentRef}
        className="relative rounded-lg border-2 bg-secondary p-1"
      >
        <div className="rounded-md border-2 bg-primary p-2">{root.value}</div>
      </div>

      {(root.left || root.right) && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
        >
          {lines.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="white"
              strokeWidth="4"
            />
          ))}
        </svg>
      )}

      <div className="flex gap-16">
        {root.left && (
          <div ref={leftChildRef} className="flex">
            <TreeRenderer root={root.left} />
          </div>
        )}

        {root.right && (
          <div ref={rightChildRef} className="flex">
            <TreeRenderer root={root.right} />
          </div>
        )}
      </div>
    </span>
  );
};

export default TreeRenderer;
