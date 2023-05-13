import { Spin } from "antd";
import { type NextPage } from "next";
import { useMetaMask } from '../hooks/useMetaMask'
import AnonCardSendForm from "~/components/AnonCard/SendForm";
import TheBackButton from '~/components/TheBackButton'

const Send: NextPage = () => {
  const { state } = useMetaMask()
  
  if(state?.status === 'loading')  {
    return (
      <div className="min-h-screen px-4 py-2">
        <Spin tip="Loading" className="min-h-screen">
          <div className="content" />
        </Spin>
      </div>
    );
  }
  return (
    <main className="min-h-screen px-4 py-2">
      <div className="space-y-3">
        <TheBackButton />
        <AnonCardSendForm/>
      </div>
    </main>
  );
};

export default Send;
