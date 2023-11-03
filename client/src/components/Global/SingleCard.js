import React from 'react';
const SingleCard = ({prop}) => {
  return (
    
       <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={require(`../../images/${prop.icon_path}`)} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>{prop.title}</h2>
              <p className='text-center text-4xl font-bold'>{prop.subtitle}</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>{prop.content}</p>
                 
              </div>
              <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>{prop.buttonText}</button>
          </div>
    
  )
}

export default SingleCard;
