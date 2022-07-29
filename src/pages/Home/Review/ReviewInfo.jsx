import React from 'react';

const ReviewInfo = ({review}) => {

  const {name, reviewDetails, location, img} = review;
  
  
  return (
    <div className='border-2 border-opacity-30 border-orange-400 rounded p-5 min-h-70 '>
      <p className='pb-5'>{reviewDetails.slice(0, 200)} </p>
      <div className="empty my-4 w-4/5 mx-auto h-[1px] bg-gray-500 opacity-30"></div>
      <div className="profile flex items-center">
      <div class="avatar">
        <div class="w-12 rounded-full">
          <img src="https://placeimg.com/192/192/people" alt=''/>
        </div>
      </div>
        <div className="profile_name pl-2 text-left">
         <p className='text-sm'>{name}</p>
         <p className='text-sm'>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;