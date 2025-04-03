import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "../../public/logo.png";

export const TopNav = () => {
    return (
        <>
            <div className="flex flex-row p-4 justify-between">
                <div className='flex flex-row'>
                    <img src={logo} alt="Logo" className="w-6 h-6" />
                    <div className="text-2xl font-bold text-white px-4">
                        Aggie
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <ConnectButton />
                </div>
            </div>
        </>
    );
};