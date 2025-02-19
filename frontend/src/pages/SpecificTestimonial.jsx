import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SpecificTestimonial = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState([]);

  const backend_url = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    axios
      .get(`${backend_url}/api/v1/testimonial/unique/${id}`)
      .then((response) => {
        setTestimonial(response.data.testimonial);
      });
  });

  return (
    <>
      <div className="border-10 border-blue-400">
        <div className=" bg-white">
          <div className="flex flex-row">
            <div className="size-5 mt-0.5">
              <img src="https://cdn.prod.website-files.com/5e9dc792e1210c5325f7ebbc/63fb43f256c0701578ad0b27_just-logo.svg" />
            </div>
            <div>Testimonial</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="px-8 pb-4 text-black"></div>
            <div className="text-xl text-stone-900">
              {testimonial.description}
            </div>
            <div className="flex flex-row gap-40 tet-md pb-5 mt-5">
              <div className="text-stone-800">{testimonial.name}</div>
              <div className="text-stone-800">{testimonial.email}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
