import { Button, Card } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CardDetail from '~/components/AnonCard/Detail'
import type { AnonCard } from '~/types';

interface MyAnonCardProps {
  // TODO: Update data type properly
  card?: AnonCard;
}

const TheNavbar =  ({ card }: MyAnonCardProps) => {
    const router = useRouter()

    return (
        <Card title="My AnonCard">
            {!card && 
            <div className="flex flex-col items-center justify-center gap-3 h-32">
                <p className="text-gray-600">Please create your card to start to connecting with Frens!</p> 
                <Button className="w-36" type="primary" onClick={()=>router.replace('/create')}>
                    Create Card
                </Button>
            </div>}
            {card && 
                <div>
                    <CardDetail card={card}/>
                    <div className='flex w-64 gap-x-2 mt-6'>
                        <Button type="primary" className='w-halfMinusGap' onClick={()=>router.replace('/send')}>
                            Send
                        </Button>
                        <Button className='w-halfMinusGap'>Edit</Button>
                    </div>
                </div>}
        </Card>    
    )
};

export default TheNavbar