import { useParams } from "react-router-dom";
//import { TestimonialCard } from "../components/TestimonialCard";
import { spacesTestimonials } from "../hooks/Hooks";

export const Spaces = () => {
  const { space_id } = useParams();

  const { testimonial } = spacesTestimonials({ space_id });
  return (
    <>
      <div>
        <div>
          {testimonial.map((Testimonials) => {
            <TestimonialCard
              name={Testimonials.name}
              email={Testimonials.email}
              description={Testimonials.description}
            />;
          })}
        </div>
      </div>
    </>
  );
};

const TestimonialCard = ({ name, email, description }) => {
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
