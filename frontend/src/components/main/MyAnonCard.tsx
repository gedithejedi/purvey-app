import { Button, Card } from 'antd';
import Link from 'next/link';
import CardDetail from '~/components/AnonCard/Detail'
import type { AnonCard } from '~/types';

interface MyAnonCardProps {
  // TODO: Update data type properly
  card?: AnonCard;
}

const TheNavbar =  ({ card }: MyAnonCardProps) => {
    return (
        <Card title="My AnonCard">
            {!card && 
            <div className="flex flex-col items-center justify-center gap-3 h-32">
                <p className="text-gray-600">Please create your card to start to connecting with Frens!</p> 
                <Button className="w-36" type="primary">
                    <Link href="/create">
                        Create Card
                    </Link>
                </Button>
            </div>}
            {card && <CardDetail card={card}/>}
        </Card>    
    )
};

export default TheNavbar