import { Card, Space, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Upload,
} from 'antd';
import { NFTStorage, File } from 'nft.storage'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { env } from "~/env.mjs";
import { ethers } from "ethers";
import anonCard from "../utils/AnonCard.json";

const NFT_STORAGE = env.NEXT_PUBLIC_NFT_STORAGE;
const client = new NFTStorage({ token: NFT_STORAGE })
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AnonCardInformation = (metadata) => {

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = "0x637FB5145070aF52095762bD6a274e4b3370B446";
  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, anonCard.abi, provider);
  
        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.safeMint();
  
        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
  
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
    const content = values.image[0].originFileObj;

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
      <Space direction="vertical" size={16}>
        <Card title="Create an AnonCard" className='w-full'>          
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            // style={{ maxWidth: 600 }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item 
              label="Upload Cover Image" 
              valuePropName="fileList" 
              getValueFromEvent={normFile} 
              name="image">
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
            <Form.Item>
              <Button type="primary" htmlType="submit">Mint</Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
}

export default AnonCardInformation
