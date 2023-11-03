import React from 'react';
//mport Typed from 'react-typed';

const Hero = (props) => {
  const {leading,heading,subtitle,content,buttonText} =props;
  return (
    <div className='text-black mt-10'>
      <div className='max-w-[800px] mt-50 w-full  mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#0c5371] font-bold p-2'>
         {leading}
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-3xl font-bold md:py-6 text-[#013555]'>
          {heading}
        </h1>
        <div className='flex justify-center items-center text-[#013555]'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
           {subtitle} 
          </p>
          {/* <Typed
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['BTB', 'BTC', 'SASS']}
            typeSpeed={120}
            backSpeed={140}
            loop
          /> */}
        </div>
        <p className='md:text-2xl text-xl font-bold text-[text-[#013555]]'>{content}</p>
        <button className='bg-[#013555] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white'>{buttonText}</button>
      </div>
    </div>
  );
};

export default Hero;