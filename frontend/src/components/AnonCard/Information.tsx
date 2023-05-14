import { Card, type UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import { NFTStorage, File } from 'nft.storage'
import { type UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { env } from "~/env.mjs";
import { ethers } from "ethers";
import anonCard from "~/utils/AnonCard.json";
import { useMetaMask } from '~/hooks/useMetaMask';
import {CONTRACT_ADDRESS} from "../../utils/constants";

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
  const askContractToMintNft = async (metadata) => {
    console.log(999)
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        console.log(provider)
        const signer = await provider.getSigner();
        const connectedContractRead = new ethers.Contract(CONTRACT_ADDRESS, anonCard.abi, provider);
        const connectedContractWrite = new ethers.Contract(CONTRACT_ADDRESS, anonCard.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        console.log(metadata);
        const nftTxn = await connectedContractWrite.safeMint(state.wallet, metadata);
        console.log(nftTxn);
        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        console.log(`Mined, see transaction: https://explorer.goerli.linea.build/tx/${nftTxn.hash}`);
  
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const onFinish = async (values) => {
    console.log("Success:", values);
    //Can directly call props here
    const content = values.image[0]?.originFileObj;

    // Set up the NFT metadata
    const metadata = await client.store({
      name: values.name,
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
      <Card title="Create an AnonCard" className='w-full'>          
        <Form
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
            <Form.Item label="Name" name="name">
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
        </Form>
      </Card>
    </div>
  );
}

export default AnonCardInformation
