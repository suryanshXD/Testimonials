import { CodeXml, Copy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const TestimonialCard = ({ name, email, description, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [testiomialId, setTestimonialId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setTestimonialId(id);
  }, [id]);

  const handlenavigate = () => {
    navigate(`/testimonail/${testiomialId}`, { replace: true });
  };

  const url = `https://testimonials-hazel-eta.vercel.app/testimonial/${testiomialId}`;

  const copyText = async () => {
    const iframe = `<iframe src='https://testimonials-hazel-eta.vercel.app/testimonial/${testiomialId}' width="45%" height="100%" frameborder="0" scrolling="no"></iframe>`;
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
      <div className="mt-8 ml-10 ">
        <div className="text-white bg-zinc-800 w-lg text-lg pb-5 pt-8 border border-neutral-200 mr-96 pl-20 hover hover:bg-zinc-700 rounded-md">
          <div className="text-xl font-medium">{description}</div>
          <div className="flex flex-row justify-items-center gap-8 mt-5">
            <div className="text-sm mb-1">{name}</div>
            <div className="text-sm">{email}</div>
          </div>
          <div className="flex justify-end pr-8">
            <button
              className="cursor-pointer"
              onClick={() => {
                setShowModal(true);
                handlenavigate;
              }}
            >
              <CodeXml size={20} />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="border-15 border-blue-400 rounded-md">
            <div className="bg-neutral-200 pl-3 pr-2 pt-5 pb-2 shadow-lg w-2xl max-w-2xl relative">
              <div className="text-zinc-900 font-medium text-xl  ml-2">
                Use the component by copying it!
              </div>
              <button
                className="absolute top-2 right-2 text-black mb-2"
                onClick={() => setShowModal(false)}
              >
                <X size={22} />
              </button>
              <p
                id="iframeText"
                className="mt-8 bg-zinc-300 mb-2 pt-6 pb-1 pl-3 pr-1.5 underline underline-offset-3 mx-6 text-stone-700  ring-1 ring-zinc-500"
              >
                &lt;iframe src=
                {url}
                width="45%" height="100%" frameborder="0" scrolling="no"
                &gt;&lt;/iframe&gt;
                <div className="flex justify-end mt-2">
                  <button className="cursor-pointer" onClick={copyText}>
                    <Copy size={18} />
                  </button>
                </div>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
