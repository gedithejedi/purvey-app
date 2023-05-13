import React, { useState } from 'react';
import { Button, Form, Input, Card, DatePicker, Modal } from 'antd';
import { QrReader } from 'react-qr-reader';

const Detail = () => {
    const [data, setData] = useState('');
    const [openQRPopup, setOpenQRPopup] = useState(false)
    const onFinish = (values) => {
        console.info("Success:", values);
    }

    const onFinishFailed = () => {
        //TODO: create function
        console.error('Failed!')
    }

    return (
    <div>
        <Modal footer={null} open={openQRPopup} className="flex items-center" onCancel={()=>setOpenQRPopup(false)}>
            <div className='flex w-[280px] flex-col gap-3'>
                <QrReader 
                    onResult={(result, error) => {
                        if (!!result) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            setData(result?.text);
                            setOpenQRPopup(false)
                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                    constraints={{ facingMode: 'user' }}
                />
                <p className='text-gray-600'>Scan the QR code to type copy the value</p>
            </div>
        </Modal>
      <Card title="Send my AnonCard" className='w-full'>          
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
            <Form.Item label="Where" name="where">
              <Input />
            </Form.Item>
            <Form.Item label="When" name="when">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Memo" name="memo">
              <Input />
            </Form.Item>
            <hr />
            <h3 className='font-semibold text-base mt-2 mb-5'>Receiver</h3>
            <div className='flex flex-col gap-5 w-full items-center mb-6'>
                <p className='text-gray-600 mb-3'>Current estimated Gas fee to send a card is ...</p>
                <div className='flex flex-col gap-5'>
                    {Boolean(data.length) && 
                        <div className='flex flex-col gap-2'>
                            <div>
                                <b>Wallet address to send:</b> {data}
                            </div>
                            <div className='flex justify-end'>
                                <Button onClick={()=>setData('')}>Clear</Button>
                            </div>
                        </div>}
                    <Button onClick={() => setOpenQRPopup(true)}>Scan QR code to get wallet address</Button>
                    <p className='text-gray-600'>Or type the wallet address to send...</p>
                    <Form.Item name="walletAddress">
                        <Input placeholder='Wallet address' disabled={Boolean(data.length)}/>
                    </Form.Item>
                </div>
            </div>
            <div className="flex justify-end">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-40" size="large">Send My Card</Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Detail