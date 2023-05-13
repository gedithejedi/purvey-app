import { Card, Empty } from 'antd';
import { useRouter } from 'next/navigation';
import type { AnonCard } from '~/types'

interface CardsGalleryProps {
  // TODO: Update data type properly
  cards: AnonCard[];
}

const TheNavbar =  ({ cards }: CardsGalleryProps) => {
    const router = useRouter()

    return (
        <Card  title="My AnonCard Wallet">
           {cards.length && <div className="flex flex-wrap gap-y-3 gap-x-2">{cards.map((card) => 
                // TODO: update with proper value
                <Card 
                    hoverable
                    cover={<img src={card.image} alt={card.name} width="auto" height="180" className='w-full h-15' />}
                    onClick={()=>{router.replace(`/anon-card/${card.tokenId}`)}}
                    key={card.tokenId}
                    className="w-full md:w-halfMinusGap"
                >
                    <p className="text-gray-600">{card.name}</p> 
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