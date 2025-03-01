const TreeRenderer = ({ root }) => {
  if (!root) return null;

  // Filter out null children
  const validChildren = root.children?.filter((child) => child !== null) || [];

  return (
    <div className="relative flex flex-col items-center">
      {/* Node */}
      <div className="rounded-lg border-2 bg-secondary p-1">
        <div className="relative z-10 flex min-w-8 items-center justify-center rounded-md border-2 bg-primary p-2">
          {root.value}
          {/* Vertical Line */}
          {validChildren.length > 0 && (
            <div className="absolute left-1/2 top-10 h-10 w-1 bg-white" />
          )}
        </div>
      </div>

      {/* Children Container */}
      {validChildren.length > 0 && (
        <div className="relative mt-4 flex gap-8">
          {/* Horizontal Line Between Siblings */}
          {validChildren.length > 1 && (
            <div
              className="absolute top-4 h-1 bg-white"
              style={{
                left: "50%", // Start at the center of the first child
                transform: "translateX(-50%)", // Align with the first child's center
                width: "calc(100% - 4rem)", // Reduce width so it ends at last child's center
              }}
            />
          )}

          {validChildren.map((child, index) => (
            <div key={index} className="relative flex justify-center">
              <TreeRenderer root={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeRenderer;
