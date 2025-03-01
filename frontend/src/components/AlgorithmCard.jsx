import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AlgorithmCard = ({ imageSrc, name, description }) => {
  return (
    <div className="my-4 flex w-64 min-w-64 flex-col gap-4 rounded-lg border-2 bg-primary p-2 text-center">
      <img
        src={imageSrc}
        alt={name}
        className="h-[160px] w-[240px] rounded-[4px]"
      />
      <h3>{name}</h3>
      <p className="my-auto">{description}</p>
      <Link
        to={`/algorithms/${name.toLowerCase().replace(/ /g, "-")}`}
        className="mx-auto w-fit hover:text-secondary hover:underline"
      >
        Visualize
      </Link>
    </div>
  );
};

AlgorithmCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AlgorithmCard;
