import TreeRenderer from "./TreeRenderer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const TreeVisualizer = ({ root }) => {
  return (
    <div className="gridded-background h-96 items-center justify-center">
      <div className="custom-scrollbar flex h-full w-full justify-center gap-1 overflow-x-auto px-8 pt-4">
        <TransformWrapper maxScale={2}>
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            {/* Animated Node Structure */}
            <TreeRenderer root={root} />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <hr />
    </div>
  );
};

export default TreeVisualizer;
