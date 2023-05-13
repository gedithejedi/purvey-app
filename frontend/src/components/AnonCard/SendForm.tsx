import React from 'react';
import { Button, Form, Input, Card, DatePicker } from 'antd';

const Detail = () => {
    const onFinish = (values) => {
        console.log("Success:", values);
    }

    const onFinishFailed = () => {
        //TODO: create function
        console.log('Failed!')
    }

    return (
    <div>
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
                <p className='text-gray-600'>Current estimated Gas fee to send a card is ...</p>
                <div className='flex flex-col gap-4'>
                    <Button>Scan QR code to get wallet address</Button>
                    <p className='text-gray-600'>Or type the wallet address to send...</p>
                    <Form.Item name="walletAddress">
                        <Input placeholder='Wallet address' />
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