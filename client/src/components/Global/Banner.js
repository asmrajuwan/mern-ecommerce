import React from 'react';
//import Typed from 'react-typed';

const Banner = (props) => {
  
  const { headingText, paragraphText, buttonText, bannerImgSrc } = props;

  return (
    <div className="mb-6 xl:mb-10 w-auto text-white shadow-blue-500/50" style={{ backgroundImage:`url(${bannerImgSrc})`}}>
      <div className="container mx-auto flex px-5 py-24 items-left justify-start flex-col">
        <div className="text-left lg:w-5/12 w-full">
          <h1 className="my-4 text-4xl font-bold leading-tight">
            {headingText}
          </h1>
          <div className='flex justify-start items-start text-white'>
            <p className="text-xl mb-8 font-bold">
              {paragraphText} &nbsp;
            </p>
            {/* <Typed
              className='text-xl font-bold mb-8 text-[#0ae4ff]'
              strings={['Innovation', 'Talents', 'Efficiency']}
              typeSpeed={120}
              backSpeed={140}
              loop
            /> */}
          </div>
          <div className="flex justify-left">
            <button
              className="hover:text-white hover:bg-[#0c5371] bg-[#0ae4ff] text-gray-800 font-bold rounded-lg py-4 px-8"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
