import { Avatar, Drawer, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { State } from "~/hooks/useMetaMask"
import Image from "next/image";
import Link from 'next/link';

interface HeaderProps {
  state: State;
  onLogout: () => void;
}

const TheNavbar =  ({ state, onLogout }: HeaderProps) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="w-full px-6 py-2 h-14 border-b-2 flex justify-between items-center">
            <Link className='h-fit' href="/">
                <Image
                    src="/Purvey_Logo_simple.svg"
                    alt="logo"
                    width={30}
                    height={30}
                />
            </Link>
            <Avatar size={32} icon={<UserOutlined />} onClick={showDrawer}/>
            <Drawer title="Welcome!" placement="right" onClose={onClose} open={open}>
                <div className='h-full flex flex-col justify-between'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p className='font-bold'>wallet: </p>
                            <p>{state.wallet}</p>
                        </div>
                        <div>
                            <p className='font-bold'>balance: </p>
                            <p>{parseInt(state.balance)} ETH</p>
                        </div>
                        <Button type="primary">Topup</Button>
                    </div>
                    <Button onClick={onLogout} className='w-full'>Logout</Button>
                </div>
            </Drawer>
        </div>
  )
};

export default TheNavbar