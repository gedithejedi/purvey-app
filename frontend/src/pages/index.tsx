import { type NextPage } from "next";
import MyAnonCard from "~/components/main/MyAnonCard"
import CardsGallery from "~/components/main/CardsGallery"

const Home: NextPage = () => {
  const fakeCards = ['card1', 'card2', 'card3']
  // const fakeCard = {
  //   image: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=826&h=550',
  //   name: 'GediTheJedi',
  //   description: 'Missed flight but somehow made to Lisbon with passion for hacking!'
  // }

  return (
    <main className="min-h-screen px-4 py-2">
      <div className="flex flex-col gap-5">
        <MyAnonCard card={null}/>
        <CardsGallery cards={fakeCards}/>
      </div>
    </main>
  );
};

export default Home;
