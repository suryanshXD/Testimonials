// import { UserRound } from "lucide-react";

// export const AuthHeader = () => {
//   return (
//     <>
//       <header>
//         <div className="flex flex-row justify-between py-6 shadow-xl ">
//           <div>
//             <div className="pl-16 flex flex-row">
//               <div className="size-10">
//                 <img src="https://cdn.prod.website-files.com/5e9dc792e1210c5325f7ebbc/63fb43f256c0701578ad0b27_just-logo.svg" />
//               </div>
//               <div className="font-bold text-2xl pt-0.5 text-white">
//                 Testimonials
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="rounded-full bg-white p-2.5 mr-12 text-lg cursor-pointer">
//               <UserRound />
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };
import { UserRound } from "lucide-react";

export const AuthHeader = () => {
  return (
    <header className="bg-gray-900 text-white shadow-xl">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-16">
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.prod.website-files.com/5e9dc792e1210c5325f7ebbc/63fb43f256c0701578ad0b27_just-logo.svg"
            alt="Logo"
            className="h-10 w-10"
          />
          <span className="font-bold text-2xl">Testimonials</span>
        </div>
        <button className="rounded-full bg-white p-2.5 text-gray-900 hover:bg-gray-200 transition-all">
          <UserRound className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};
