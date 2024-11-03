import React from "react";
import { FOOD_LOGO } from "../utils/constants";
import { addToCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const ItemList = ({ items }) => {
  console.log(items);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    //Dispatch an action

    dispatch(addToCart(item));
  };
  return (
    <>
      {items?.map((item) => {
        const itemPrice =
          item?.card?.info?.price || item?.card?.info?.defaultPrice;

        return (
          <div
            key={item.card.info.id}
            className="p-2 m-2 border border-gray-200 border-b-2 text-left flex justify-between"
          >
            <div className="w-8/12">
              <div className="py-2">
                <span>{item?.card?.info?.name}</span>
                <span> ₹{itemPrice / 100}</span>
              </div>
              <p className="text-xs">{item?.card?.info?.description}</p>
            </div>
            <div className="w-3/12 p-4">
              <img
                src={FOOD_LOGO + item?.card?.info?.imageId}
                className="w-full"
                alt="Picture is available"
              />
            </div>
            <div className="w-1/12 p-2 m-2">
              <div className="flex flex-col  my-5">
                <button className="my-2" onClick={() => handleAddItem({...item,itemPrice})}>
                  Add+
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ItemList;

{
  /* <div className="absolute">
              <button
                className="p-2 bg-black shadow-lg text-white mx-16 "
                onClick={() => handleAddItem(item)}
              >
                {/* We are passing the callback function , not calling the function  */
}
//   Add+
// </button>
// <button
//   className="p-2 bg-black shadow-lg text-white mx-16 "
//   onClick={() => handleAddItem(item)}
// >
//   {/* We are passing the callback function , not calling the function  */}
//   Add+
// </button>

// </div> */}

// return (
//   <>

//       <ul className='p-4'>
//         {items?.card?.card?.itemCards?.map((item, i) => {
//           const itemPrice =
//             item?.card?.info?.price || item?.card?.info?.defaultPrice;

//           return (
//             <li
//               className='p-2 py-8 flex gap-4 md:gap-8 justify-between items-center border-b'
//               key={i}
//             >
//               <div className='basis-8/12 space-y-2'>
//                 <h2 className='text-base font-semibold'>
//                   {item?.card?.info?.name}
//                 </h2>
//                 <p className='text-xs font-semibold'>₹{itemPrice / 100}</p>
//                 <p className='text-xs hidden md:block'>
//                   {item?.card?.info?.description}
//                 </p>
//               </div>

//               <div className='w-full basis-4/12 relative'>
//                 <img
//                   className='w-full h-32 aspect-video object-cover rounded-md'
//                   src={CDN_URL + item?.card?.info?.imageId}
//                   alt=''
//                 />
//                 <button
//                   onClick={() => handleAddToCart({ ...item, itemPrice })}
//                   className='bg-white text-orange-500 hover:bg-orange-500 hover:text-white font-bold p-2 px-6 rounded-md absolute shadow-md left-[50%] -bottom-5 -translate-x-[50%]'
//                 >
//                   ADD
//                 </button>
//               </div>
//             </li>
//           );
//         })}
//       </ul>

//   </>
// );
