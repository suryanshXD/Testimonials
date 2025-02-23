// import { CodeXml, Copy, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export const TestimonialCard = ({ name, email, description, id }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [testiomialId, setTestimonialId] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     setTestimonialId(id);
//   }, [id]);

//   const handlenavigate = () => {
//     navigate(`/testimonail/${testiomialId}`, { replace: true });
//   };

//   const copyText = async () => {
//     const iframe = `<iframe src='https://testimonials-hazel-eta.vercel.app/${testiomialId}' width="45%" height="100%" frameborder="0" scrolling="no"></iframe>`;
//     await navigator.clipboard.writeText(iframe);
//     toast("<iframe> copied", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "dark",
//     });
//   };

//   return (
//     <>
//       <div className="mt-8 ml-10 ">
//         <div className="text-white bg-zinc-800 w-lg text-lg pb-5 pt-8 border border-neutral-200 mr-96 pl-20 hover hover:bg-zinc-700 rounded-md">
//           <div className="text-xl font-medium">{description}</div>
//           <div className="flex flex-row justify-items-center gap-8 mt-5">
//             <div className="text-sm mb-1">{name}</div>
//             <div className="text-sm">{email}</div>
//           </div>
//           <div className="flex justify-end pr-8">
//             <button
//               className="cursor-pointer"
//               onClick={() => {
//                 setShowModal(true);
//                 handlenavigate;
//               }}
//             >
//               <CodeXml size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center">
//           <div className="border-15 border-blue-400 rounded-md">
//             <div className="bg-neutral-200 pl-3 pr-2 pt-5 pb-2 shadow-lg w-2xl max-w-2xl relative">
//               <div className="text-zinc-900 font-medium text-xl  ml-2">
//                 Use the component by copying it!
//               </div>
//               <button
//                 className="absolute top-2 right-2 text-black mb-2"
//                 onClick={() => setShowModal(false)}
//               >
//                 <X size={22} />
//               </button>
//               <div
//                 id="iframeText"
//                 className="mt-8 bg-zinc-300 mb-2 pt-6 pb-1 pl-3 pr-1.5 underline underline-offset-3 mx-6 text-stone-700  ring-1 ring-zinc-500"
//               >
//                 &lt;iframe src= 'https://testimonials-hazel-eta.vercel.app/
//                 {testiomialId}' width="45%" height="100%" frameborder="0"
//                 scrolling="no" &gt;&lt;/iframe&gt;
//                 <div className="flex justify-end mt-2">
//                   <button className="cursor-pointer" onClick={copyText}>
//                     <Copy size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

import { CodeXml, Copy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const TestimonialCard = ({ name, email, description, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [testimonialId, setTestimonialId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTestimonialId(id);
  }, [id]);

  const handlenavigate = () => {
    navigate(`/testimonial/${testimonialId}`, { replace: true });
  };

  const copyText = async () => {
    const iframe = `<iframe src='https://testimonials-hazel-eta.vercel.app/testimonial/${testimonialId}' width="100%" height="300px" frameborder="0" scrolling="no"></iframe>`;
    await navigator.clipboard.writeText(iframe);
    toast("<iframe> copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="mt-6 px-4 md:px-8 lg:px-16 w-full max-w-3xl mx-auto">
        <div className="text-white bg-zinc-800 p-6 rounded-lg border border-neutral-200 hover:bg-zinc-700 transition duration-300">
          <div className="text-lg font-medium">{description}</div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4">
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-sm text-gray-400">{email}</div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="p-2 rounded-md hover:bg-zinc-600 transition"
              onClick={() => setShowModal(true)}
            >
              <CodeXml size={20} />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-neutral-200 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <div className="text-zinc-900 font-medium text-lg mb-4">
              Copy the component below:
            </div>
            <button
              className="absolute top-3 right-3 text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={22} />
            </button>
            <div className="bg-zinc-300 p-4 rounded-md text-sm text-gray-700 overflow-auto">
              &lt;iframe
              src='https://testimonials-hazel-eta.vercel.app/testimonial/
              {testimonialId}' width="32%" height="300px" frameborder="0"
              scrolling="no" &gt;&lt;/iframe&gt;
              <div className="flex justify-end mt-2">
                <button
                  className="p-2 rounded-md hover:bg-zinc-400 transition"
                  onClick={copyText}
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
