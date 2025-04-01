import { useRef } from "react";
import TreeRenderer from "./TreeRenderer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const TreeVisualizer = ({ root }) => {
  const transformRef = useRef(null);

  return (
    <div className="gridded-background h-96 items-center justify-center">
      <div className="custom-scrollbar flex h-full w-full justify-center gap-1 overflow-x-auto px-8 pt-4">
        <TransformWrapper maxScale={2} minScale={0.5} ref={transformRef}>
          {({ resetTransform }) => (
            <>
              <button onClick={() => resetTransform()} className="h-fit">
                Reset
              </button>
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
              >
                <TreeRenderer root={root} />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
      <hr />
    </div>
  );
};

export default TreeVisualizer;
