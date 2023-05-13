import { Card, Empty } from 'antd';
import { useRouter } from 'next/navigation';

interface CardsGalleryProps {
  // TODO: Update data type properly
  cards: string[];
}

const TheNavbar =  ({ cards }: CardsGalleryProps) => {
    const router = useRouter()

    return (
        <Card  title="My AnonCard Wallet">
           {cards.length && <div className="flex flex-wrap gap-y-3 gap-x-2">{cards.map((card, idx) => 
                // TODO: update with proper value
                <Card 
                    hoverable
                    cover={<img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt={card} width="auto" height="180" className='w-full h-15' />}
                    onClick={()=>{router.replace('#')}}
                    key={idx}
                    className="w-full md:w-halfMinusGap"
                >
                    <p className="text-gray-600">{card}</p> 
                </Card>
            )}</div>}

            {!cards.length && <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                <p className="text-gray-600">
                You didn’t collect any card yet.
                Start connecting with people
                by collecting their AnonCard!
                </p>
            </div>}  
        </Card>        
    )
};

export default TheNavbar