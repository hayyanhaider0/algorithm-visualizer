import AlgorithmCard from "./AlgorithmCard";

const AlgorithmSection = ({ algorithms }) => {
  return (
    <span className="flex w-full flex-wrap justify-center gap-8 p-8 text-center">
      {algorithms.map((algorithm, index) => (
        <AlgorithmCard
          key={index}
          imageSrc={algorithm.imageSrc}
          name={algorithm.name}
          description={algorithm.description}
        />
      ))}
    </span>
  );
};

export default AlgorithmSection;
