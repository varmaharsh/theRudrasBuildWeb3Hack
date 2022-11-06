import { useRouter } from "next/router";
import { useState } from "react";
import { Avatar, Button } from "web3uikit";
import { loginViaGoogle } from "../utils/storageProvider";

const NavBar = ({ loggedIn }) => {
  const router = useRouter();
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState(
    "0xBB0d8f6360157307658f4dA1A21BB49516BBF725"
  );
  const handleProfileClick = () => {
    router.push(`/profile`);
  };
  return (
    <div className="w-full h-20 flex flex-row justify-between p-2 bg-white align-middle shadow-sm">
      <div className="container m-auto px-4 py-2 flex justify-between items-center">
        <span className="text-2xl font-bold"></span>
        {!loggedIn ? (
          <Button
            onClick={loginViaGoogle}
            size="large"
            text="Login via Google"
            theme="outline"
          />
        ) : (
          <div className="flex flex-row items-center">
            {/* <p className="text-2xl font-bold">{`${address.slice(
              0,
              6
            )}......${address.slice(-4)}`}</p> */}
            <Button
              onClick={() => {
                router.push("/secHandStore");
              }}
              size="large"
              text="Second Hand Store"
            />
            <Avatar
              isRounded
              theme="image"
              className="ml-6 cursor-pointer"
              size={48}
              onClick={handleProfileClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
