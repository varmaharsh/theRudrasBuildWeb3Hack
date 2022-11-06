import { utils } from "ethers";
import Image from "next/image";
import { Button } from "web3uikit";
import { genreMapper, nftTypeMapper } from "../constants";
import { getContract } from "../utils";
import { getArcanaProviderOrSigner } from "../utils/storageProvider";

const SecHandBookCard = ({ info, onclick }) => {
  async function handleBuyNft() {
    try {
      const signer = await getArcanaProviderOrSigner(true);
      const contract = getContract(signer);

      const tx = await contract.orderSecondHandBook(info.tokenId.toString(), {
        gasPrice: 200,
        gasLimit: 9000000,
        value: utils.parseEther((info.sellingPrice / 1000000000).toString()),
      });
      alert("Transaction in progress");
      await tx.wait();
      alert("Physical copy bought successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden bg-white mx-4 my-4 shadow-sm cursor-pointer"
      style={{ width: "280px" }}
    >
      <Image
        style={{ minHeight: "250px", maxHeight: "250px", objectFit: "cover" }}
        src={info.uri}
        alt="Book Cover"
        layout="responsive"
        width={100}
        height={100}
      />
      <div className="mt-2 mb-7 p-4 pb-0 flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-base text-black">
            {info.book_name}
          </h2>
          <h2 className="text-base text-slate-500">
            Nft Type: {nftTypeMapper[info.nftType]}
          </h2>
          <p className="text-slate-500 text-sm">{genreMapper[info.genre]}</p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-500">Matic</h2>
          <p className="text-2xl font-bold">
            {utils.formatEther(info.sellingPrice || 0) * 10 ** 9}
          </p>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div>
          <Button
            onClick={onclick}
            size="large"
            isFullWidth
            text="Show Details"
            theme="outline"
          />
        </div>
        <div className="mt-4">
          <Button
            onClick={handleBuyNft}
            size="large"
            isFullWidth
            text="Buy Now"
            theme="outline"
          />
        </div>
      </div>
    </div>
  );
};

export default SecHandBookCard;
