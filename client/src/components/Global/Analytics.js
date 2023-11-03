import React from 'react';

const Analytics = (props) => {
  const {image,leadingText,headingText,contentText,buttonText}=props;
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={image} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#013555] font-bold '>{leadingText}</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>{headingText}</h1>
          <p>
            {contentText}
          </p>
          <button className='bg-[#013555] text-[#88ceea] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;