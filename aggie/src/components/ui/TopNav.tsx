import { ConnectButton } from '@rainbow-me/rainbowkit';

export const TopNav = () => {
    return (
        <>
            <div className="flex flex-row p-4 justify-between">
                <div className="text-2xl font-bold text-white">
                    AGGIE
                </div>
            <div className="flex flex-col items-end">
              <ConnectButton />
            </div>
            </div>
        </>
    );
};