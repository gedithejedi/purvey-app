import { Avatar, Drawer, Button, Modal } from 'antd';
import { UserOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { State } from "~/hooks/useMetaMask"
import Image from "next/image";
import Link from 'next/link';
import QRCode from "react-qr-code";

interface HeaderProps {
  state: State;
  onLogout: () => void;
}

const TheNavbar =  ({ state, onLogout }: HeaderProps) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [openQRPopup, setOpenQRPopup] = useState(false);

    return (
        <div className="w-full px-6 py-2 h-14 border-b-2 flex justify-center">
            <div className="w-full max-w-7xl flex justify-between items-center">
                <Link className='h-fit' href="/">
                    <Image
                        src="/Purvey_Logo_simple.svg"
                        alt="logo"
                        width={30}
                        height={30}
                    />
                </Link>
                <div>
                    {/* TODO: replace it with user's name in the card */}
                <span className='pr-2'>GM! {`${state.wallet?.slice(0,10)}...` ?? ''}</span>
                    <Avatar size={32} icon={<UserOutlined />} onClick={()=>setOpenDrawer(true)}/>
                </div>
            </div>
            {/* TODO: replace it with user's name in the card */}
            <Drawer title={`GM! ${state.wallet?.slice(0,25)}...`} placement="right" onClose={()=>setOpenDrawer(false)} open={openDrawer}>
                <Modal footer={null} open={openPopup} className="flex items-center" onCancel={()=>setOpenPopup(false)}>
                    <div className='flex w-[280px] flex-col gap-3'>
                        <iframe src="https://giphy.com/embed/XIqCQx02E1U9W" width="280" height="130" allowFullScreen></iframe>
                        <p>
                            We are very sorry to say that you did not hear this from us...<br/>
                            <b>"Attention"</b> if you want to get some of that LineaETH tweet 
                            &nbsp;<Button href="https://twitter.com/_emjlin" target="_blank" type="link" className='m-0 p-0'>@_emjlin</Button>😉
                        </p>
                    </div>
                </Modal>
                <Modal footer={null} open={openQRPopup} className="flex items-center" onCancel={()=>setOpenQRPopup(false)}>
                    <div className='flex w-[280px] flex-col gap-3'>
                       <QRCode value={state.wallet} />
                        <p className='text-gray-600'>Scan the QR code to type copy the value</p>
                    </div>
                </Modal>
                <div className='h-full flex flex-col justify-between'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p className='font-bold'>wallet: </p>
                            <p>{state.wallet}</p>
                            <Button type="primary" onClick={()=>setOpenQRPopup(true)}>
                                <QrcodeOutlined />
                            </Button>
                        </div>
                        <div>
                            <p className='font-bold'>balance: </p>
                            <p>{parseInt(state.balance)} ETH</p>
                        </div>
                        <Button type="primary" onClick={()=>setOpenPopup(true)}>
                            Topup
                        </Button>
                    </div>
                    <Button onClick={onLogout} className='w-full'>Logout</Button>
                </div>
            </Drawer>
        </div>
    )
};

export default TheNavbar