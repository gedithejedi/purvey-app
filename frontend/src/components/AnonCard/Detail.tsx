import React from 'react';
import type { AnonCard } from '~/types';

interface DetailProps {
  card: AnonCard;
}

const Detail = ({ card }: DetailProps) => (
  <div className="flex flex-col gap-y-3 items-center sm:items-start">
      {
          Object.keys(card).map((key, index) => {
          return (
              <div key={index} className='w-full'>
                {
                  (()=> {
                    if(key === 'tokenId') {
                      return <div className='font-bold mb-1 text-primary'># {card[key]}</div>
                    } else if (key === 'image') {
                      return <img src={card[key]} alt={card[key]} className='md:w-1/2' />
                    } 

                    return <div className='flex w-full'>
                        <div className='w-24 font-bold'>{key}: </div>
                        <div style={{width: "calc(100% - 6rem)"}}>{card[key]}</div>
                    </div>
                  })()
                }
              </div>
          );
      })}
  </div>
);

export default Detail