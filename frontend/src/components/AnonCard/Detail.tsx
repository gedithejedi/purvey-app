import { Button } from 'antd';
import React from 'react';
import type { AnonCard } from '~/types';

interface DetailProps {
  card: AnonCard;
}

const Detail = ({ card }: DetailProps) => (
  <header>
    <div className="flex flex-col gap-y-3 items-center sm:items-start">
        {
            Object.keys(card).map((key, index) => {
            return (
                <div key={index} className='w-full'>
                    {key === 'image' && <img src={card[key]} alt={card[key]} className='md:w-1/2' />}
                    {key !== 'image' && 
                        <div className='flex w-full'>
                            <div className='w-24 font-bold'>{key}: </div>
                            <div style={{width: "calc(100% - 6rem)"}}>{card[key]}</div>
                        </div>
                    }
                </div>
            );
        })}
        <div className='flex w-64 gap-x-2 mt-6'>
            <Button type="primary" className='w-halfMinusGap'>Send</Button>
            <Button className='w-halfMinusGap'>Edit</Button>
        </div>
    </div>
  </header>
);

export default Detail