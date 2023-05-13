import { type NextPage } from "next";
import MyAnonCard from "~/components/main/MyAnonCard"
import { Card } from 'antd';
import { Empty } from 'antd';

const Home: NextPage = () => {
  
  return (
    <main className="min-h-screen px-4 py-2">
      <div className="flex flex-col gap-5">
        <MyAnonCard />
        <Card  title="My AnonCard Wallet">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <p className="text-gray-600">
            You didn’t collect any card yet.
            Start connecting with people
            by collecting their AnonCard!
          </p>
        </Card>
      </div>
    </main>
  );
};

export default Home;
