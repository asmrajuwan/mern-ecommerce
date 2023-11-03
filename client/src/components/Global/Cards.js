import React from 'react';
import singleCardProps from '../../data/singleCard';
import SingleCard from './SingleCard';

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        {singleCardProps.map((props,id) => (
          <div key={id}>
            <SingleCard prop={props}/>
          </div>
               ))};
      </div>
    </div>
  );
};

export default Cards;