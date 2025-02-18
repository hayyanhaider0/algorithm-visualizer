import React from "react";

const Description = ({ description }) => {
  return (
    <section>
      <div className="bg-primary py-4 text-center">
        <h2>Description</h2>
      </div>
      <div className="custom-scrollbar max-h-[34.7rem] overflow-auto bg-background p-4">
        {description.map((paragraph, index) => (
          <React.Fragment key={index}>
            <p className="text-lg">{paragraph}</p>
            <br />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Description;
