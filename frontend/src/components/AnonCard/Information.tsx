import { Card, type UploadProps, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import { NFTStorage, File } from 'nft.storage'
import { type UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { env } from "~/env.mjs";
import { ethers } from "ethers";
import anonCard from "~/utils/AnonCard.json";
import { useMetaMask } from '~/hooks/useMetaMask';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NFT_STORAGE = env.NEXT_PUBLIC_NFT_STORAGE;
const client = new NFTStorage({ token: NFT_STORAGE })
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AnonCardInformation = () => {
  const {state} = useMetaMask()
  const [openPopup, setOpenPopup] = useState(false);
  const [createdToken, setCreatedToken] = useState('');
  const [minting, setMinting] = useState(false);

  const router = useRouter()
  const askContractToMintNft = async (metadata) => {
    const CONTRACT_ADDRESS = "0x637FB5145070aF52095762bD6a274e4b3370B446";
    console.log(999)
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        console.log(provider)
        const signer = await provider.getSigner();
        const connectedContractRead = new ethers.Contract(CONTRACT_ADDRESS, anonCard.abi, provider);
        const connectedContractWrite = new ethers.Contract(CONTRACT_ADDRESS, anonCard.abi, signer);
        
        setMinting(true)
        console.log("Going to pop wallet now to pay gas...")
        console.log(metadata);
        const nftTxn = await connectedContractWrite.safeMint(state.wallet, metadata);
        console.log(nftTxn);
        console.log("Mining...please wait.")
        await nftTxn.wait();

        setCreatedToken(String(nftTxn.hash ?? ''))
        console.log(`Mined, see transaction: https://explorer.goerli.linea.build/tx/${nftTxn.hash}`);
        setMinting(false)
        setOpenPopup(true)
      } else {
        console.log("Ethereum object doesn't exist!");
        Modal.error({
          title: 'This is an error message',
          content: "Your AnonCard couldn't be minted. (Ethereum object doesn't exist!)",
        });
      }
    } catch (error) {
      console.log(error)
      const errorText = error.message ? error.message as string : "Unknown error occurred!"
      Modal.error({
        title: 'This is an error message',
        content: `Your AnonCard couldn't be minted. (${errorText})`,
      });
    }
  }
  
  const onFinish = async (values) => {
    console.log("Success:", values);
    //Can directly call props here
    const content = values.image[0]?.originFileObj;

    // Set up the NFT metadata
    const metadata = await client.store({
      name: values.name,
      discord: values.discord,
      twitter: values.twitter,
      description: values.description,
      image: new File(
        [content],
        content.name,
        { type: content.type }
      ),
    })

    if(metadata.url === undefined)
      return console.log("Failed creating the NFT's IPFS metadata");

    askContractToMintNft(metadata.url)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadSettings: UploadProps = {
    name: "image",
    multiple: false,
  };

  // Gets rid of the automatic file upload
  const dummyRequest = ({file, onSuccess}: RcCustomRequestOptions<any>) => {
    setTimeout(()=> {
      onSuccess && onSuccess(`${file} file uploaded successfully.`);
    }, 0)
  }

  return (
    <div>
      <Modal open={openPopup} className="flex items-center" onOk={() => router.replace('/')} onCancel={() => router.replace('/')}>
          <p>Your AnonCard has been successfully minted!</p>
          <div>Check it out on <Button type="link" href={`https://explorer.goerli.linea.build/tx/${createdToken}`} target='_blank'>transaction</Button></div>
      </Modal>
      <Card title="Create an AnonCard" className='w-full'>   
        {minting && <div>Minting ...</div>}       
        {!minting && <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className='flex flex-col'>
            <Form.Item 
              label="Upload Cover Image" 
              valuePropName="fileList" 
              getValueFromEvent={normFile} 
              name="image"
              extra="(Uploading more than one pictures will reset the previously uploaded picture)"
              rules={[{ required: true, message: 'Please uplaod cover image' }]}
            >
              <Upload
                {...uploadSettings}
                customRequest={dummyRequest}
                listType="picture-card"
                accept="image/*"
                maxCount={1}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Discord" name="discord">
              <Input />
            </Form.Item>
            <Form.Item label="Twitter" name="twitter">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
            <div className="flex justify-end">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-40" size="large">Mint</Button>
              </Form.Item>
            </div>
          </div>
        </Form>}
      </Card>
    </div>
  );
}

export default AnonCardInformation
