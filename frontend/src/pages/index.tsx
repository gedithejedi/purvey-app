import { type NextPage } from "next";
import MyAnonCard from "~/components/main/MyAnonCard"

const Home: NextPage = () => {
  
  return (
    <main className="min-h-screen px-4 py-2">
      <MyAnonCard />
    </main>
  );
};

export default Home;
