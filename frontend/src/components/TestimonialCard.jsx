export const TestimonialCard = ({ name, email, description }) => {
  return (
    <>
      <div>
        <h1>Hii testi</h1>
        <div>
          <div className="text-red-800 text-lg">
            <div>{name}</div>
            <div>{email}</div>
            <div>{description}</div>
          </div>
        </div>
      </div>
    </>
  );
};
