import { type NextPage } from "next";
import MyAnonCard from "~/components/main/MyAnonCard"
import CardsGallery from "~/components/main/CardsGallery"

const Home: NextPage = () => {
  const fakeCards = [{
    tokenId: '123456789',
    image: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=826&h=550',
    name: 'GediTheJedi',
    description: 'Missed flight but somehow made to Lisbon with passion for hacking!'
  }, {
    tokenId: '234234234',
    image: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=826&h=550',
    name: 'Danni123',
    description: 'Best hacker in the world!'
  }, {
    tokenId: '333233321',
    image: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=826&h=550',
    name: 'GoyangeeGiyeowo',
    description: 'All the cats in the world are equally cute.'
  }]

  const fakeCard = {
    tokenId: '123456789',
    image: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=826&h=550',
    name: 'GediTheJedi',
    description: 'Missed flight but somehow made to Lisbon with passion for hacking!'
  }

  return (
    <main className="min-h-screen px-4 py-2">
      <div className="flex flex-col gap-5">
        <MyAnonCard card={fakeCard}/>
        <CardsGallery cards={fakeCards}/>
      </div>
    </main>
  );
};

export default Home;
