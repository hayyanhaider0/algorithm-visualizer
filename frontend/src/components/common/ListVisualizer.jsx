import { AnimatePresence, motion } from "framer-motion";

const ListVisualizer = ({ type, structure }) => {
  if (!structure) structure = [];
  return (
    <div className="gridded-background h-36 items-center justify-center">
      <div className="custom-scrollbar flex h-full w-full items-center gap-1 overflow-x-scroll px-8">
        {type === "queue" && (
          <div
            title="Bottom"
            className="aspect-square h-16 -translate-x-8 rotate-45 border-r-4 border-t-4"
          />
        )}
        {/* Animated Node Structure */}
        {type === "stack" && <div title="Bottom" className="h-24 border-2" />}
        <AnimatePresence>
          {structure.map((node, index) => (
            <motion.div
              key={type === "heap" ? index : node.id}
              className="relative flex gap-1 rounded-lg border-2 bg-secondary p-1"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                duration: 0.4,
              }}
            >
              <p className="text-primary">{index}</p>
              <p className="rounded-md border-2 bg-primary p-2 text-xl">
                {type === "heap" ? node : node.value}
              </p>
              {type !== "heap" && (
                <p className="pt-1 text-3xl text-primary">→</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {(type === "stack" || type === "queue") && (
          <div
            title="Top"
            className="aspect-square h-16 -translate-x-8 rotate-45 border-r-4 border-t-4"
          />
        )}
      </div>
      <hr />
    </div>
  );
};

export default ListVisualizer;
