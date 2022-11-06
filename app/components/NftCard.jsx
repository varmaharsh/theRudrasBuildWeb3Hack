import { utils } from "ethers";
import { useState } from "react";
import { Button, Input } from "web3uikit";
import {
  deliveryStatusMapper,
  nftTypeMapper,
  ownerShipMapper,
} from "../constants";
import { getContract } from "../utils";
import { getArcanaProviderOrSigner } from "../utils/storageProvider";
import PdfModal from "./PdfModal";

const NftCard = ({ info, onclick, getAllBooks }) => {
  const [salePrice, setSalePrice] = useState();
  const [showInputs, setShowInputs] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function putNftForSale() {
    try {
      if (salePrice <= 0) {
        alert("Please enter a valid price");
        return;
      }
      const signer = await getArcanaProviderOrSigner(true);
      const contract = getContract(signer);

      const tx = await contract.putNFTToSale(
        info.tokenId.toString(),
        (salePrice * 10 ** 9).toString(),
        {
          gasPrice: 100,
          gasLimit: 9000000,
        }
      );
      alert("Transaction in progress");
      await tx.wait();
      alert("Nft put for sale successfully");
      getAllBooks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <PdfModal
        showModal={showModal}
        setShowModal={setShowModal}
        pdfLink={
          "https://ipfs.io/ipfs/QmaNxbQNrJdLzzd8CKRutBjMZ6GXRjvuPepLuNSsfdeJRJ"
        }
      />
      <div
        className="rounded-xl overflow-hidden bg-white mx-4 my-4 shadow-sm cursor-pointer"
        style={{ width: "280px" }}
        onClick={onclick}
      >
        <div className="mt-2 mb-7 p-4 pb-0 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">
              Token ID: {info.tokenId.toString()}
            </h2>
            <p className="text-slate-500 text-lg mt-2">
              Onwnership Status: {ownerShipMapper[info.ownership]}
            </p>
            <p className="text-slate-500 text-lg mt-2">
              Nft Type: {nftTypeMapper[info.nftType]}
            </p>
            <p className="text-slate-500 text-lg mt-2">
              Delivery Status: {deliveryStatusMapper[info.deliveryStatus]}
            </p>
            {/* <p className="text-slate-500 text-lg mt-2">
              Delivery Status: {deliveryStatusMapper[info.deliveryStatus]}
            </p> */}
            <div className="mt-10">
              {info.ownership === 1 ? (
                info.openForSale ? (
                  <p className="text-slate-500 text-lg mt-2">
                    Currenlty listed for:{" "}
                    {utils.formatEther(info.sellingPrice || 0) * 10 ** 9} Matic
                  </p>
                ) : !showInputs ? (
                  <Button
                    onClick={() => setShowInputs(true)}
                    size="large"
                    isFullWidth
                    text="Put Nft for Sale"
                    theme="outline"
                  />
                ) : (
                  <div className="flex flex-col justify-between">
                    <div style={{ maxWidth: "200px" }}>
                      <Input
                        label=""
                        name="salePrice"
                        placeholder="Sale Price"
                        value={salePrice}
                        onBlur={function noRefCheck() {}}
                        onChange={(e) => setSalePrice(e.target.value)}
                      />
                    </div>
                    <div style={{ maxWidth: "200px" }} className="mt-4">
                      <Button
                        onClick={putNftForSale}
                        size="large"
                        isFullWidth
                        text="Put Nft for Sale"
                        theme="outline"
                      />
                    </div>
                  </div>
                )
              ) : null}
              {console.log(info)}
              {info.nftType == 2 ? (
                <div
                  style={{ maxWidth: "200px", width: "200px" }}
                  className="mt-4"
                >
                  <Button
                    // onClick={() =>
                    //   window.open(
                    //     "https://ipfs.io/ipfs/QmaNxbQNrJdLzzd8CKRutBjMZ6GXRjvuPepLuNSsfdeJRJ",
                    //     "_blank"
                    //   )
                    // }
                    onclick={() => setShowModal(true)}
                    size="large"
                    isFullWidth
                    text="View Pdf"
                    theme="outline"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftCard;
