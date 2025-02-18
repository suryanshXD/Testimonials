import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const userSpaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    setInterval(() => {
      axios
        .get(`http://localhost:3000/api/v1/space/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setSpaces(response.data.user_space);
        });
    }, 500);
  }, []);
  return {
    spaces,
  };
};

export const spacesTestimonials = ({ space_id }) => {
  const [testimonial, setTestimonial] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/testimonial/${space_id}`)
      .then((response) => {
        setTestimonial(response.data.space_testimonials);
      });
  }, [space_id]);

  return {
    testimonial,
  };
};
