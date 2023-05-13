import { type NextPage } from "next";
import MyAnonCard from "~/components/main/MyAnonCard"
import CardsGallery from "~/components/main/CardsGallery"

const Home: NextPage = () => {
  const cards = ['card1', 'card2', 'card3']

  return (
    <main className="min-h-screen px-4 py-2">
      <div className="flex flex-col gap-5">
        <MyAnonCard />
        <CardsGallery cards={cards}/>
      </div>
    </main>
  );
};

export default Home;
