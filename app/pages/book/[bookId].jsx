import { utils } from "ethers";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "web3uikit";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { genreMapper } from "../../constants";
import { getContract } from "../../utils";
import {
  getArcanaProviderOrSigner,
  getLoggedInStatus,
} from "../../utils/storageProvider";
import { useAppContext } from "../_app";

const BookInfo = () => {
  const router = useRouter();
  const [bookInfo, setBookInfo] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { chainId, setChainId } = useAppContext();
  // const web3ModalRef = useRef();

  useEffect(() => {
    // if (!walletConnected) {
    // web3ModalRef.current = getWeb3Modal();
    onPageLoad();
    console.log(chainId);
    if (chainId === 80001) {
      getBookById(router.query.bookId);
    }
    // }
  }, [chainId]);

  async function onPageLoad() {
    getBookById(router.query.bookId);
    const loggedIn = getLoggedInStatus();
    setLoggedIn(loggedIn);
    // setHooks(setChainId);
  }

  async function getBookById() {
    try {
      const provider = await getArcanaProviderOrSigner();
      const contract = getContract(provider);

      const info = await contract.getBookById(router.query.bookId?.toString());
      setBookInfo(info);
    } catch (error) {
      console.log(error);
    }
  }

  async function buyPhysicalCopy() {
    try {
      const signer = await getArcanaProviderOrSigner(true);
      const contract = getContract(signer);

      const tx = await contract.orderBook(
        router.query.bookId?.toString(),
        "1",
        "0",
        {
          gasPrice: 100,
          gasLimit: 9000000,
          value: utils.parseEther(
            (bookInfo.physical_price / 1000000000).toString()
          ),
        }
      );
      alert("Transaction in progress");
      await tx.wait();
      alert("Physical copy bought successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function buyDigitalCopy() {
    try {
      const signer = await getArcanaProviderOrSigner(true);
      const contract = getContract(signer);

      const tx = await contract.orderBook(
        router.query.bookId?.toString(),
        "2",
        "0",
        {
          gasPrice: 100,
          gasLimit: 9000000,
          value: utils.parseEther(
            (bookInfo.digital_price / 1000000000).toString()
          ),
        }
      );
      alert("Transaction in progress");
      await tx.wait();
      alert("Digital copy bought successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function rentBook() {
    try {
      const signer = await getArcanaProviderOrSigner(true);
      const contract = getContract(signer);

      const tx = await contract.orderBook(
        router.query.bookId?.toString(),
        "2",
        (Date.now() + 1000 * 60 * 60 * 24 * 30).toString(),
        {
          gasPrice: 100,
          gasLimit: 9000000,
          value: utils.parseEther(
            (bookInfo.rentPricePerMonth / 1000000000).toString()
          ),
        }
      );
      alert("Transaction in progress");
      await tx.wait();
      alert("Book rented successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {chainId && chainId == 80001 ? (
        <>
          <NavBar loggedIn={loggedIn} />
          {bookInfo ? (
            <>
              <div className="container m-auto mt-12 px-4 py-2 flex flex-col w-full">
                <h1 className="text-6xl font-extrabold">
                  {bookInfo.book_name}
                </h1>
                <div className="container m-auto mt-12 flex">
                  <img
                    src={bookInfo.uri}
                    className="w-2/5 rounded-2xl"
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                  <div className="w-1/2 mt-2 p-4 pl-14 pb-0 flex justify-between items-start">
                    <div>
                      <h2 className="text-5xl font-extrabold">
                        {bookInfo.authorName}
                      </h2>
                      <p className="text-slate-500 text-3xl mt-3 font-bold">
                        {genreMapper[bookInfo.genre]}
                      </p>

                      <p className="text-xl font-regular text-slate-500 mt-6">
                        {bookInfo.description}
                      </p>

                      <div className="flex flex-col justify-between items-start m-0 mt-16 p-0">
                        <div className="mt-4">
                          <Button
                            onClick={buyPhysicalCopy}
                            size="large"
                            isFullWidth
                            text={`Buy physical copy for ${
                              utils.formatEther(bookInfo.physical_price || 0) *
                              10 ** 9
                            } Matic`}
                            theme="outline"
                          />
                        </div>
                        <div className="mt-4">
                          <Button
                            onClick={buyDigitalCopy}
                            size="large"
                            isFullWidth
                            text={`Buy digital copy for ${
                              utils.formatEther(bookInfo.digital_price || 0) *
                              10 ** 9
                            } Matic`}
                            theme="outline"
                          />
                        </div>
                        <div className="mt-4">
                          <Button
                            onClick={rentBook}
                            size="large"
                            isFullWidth
                            text={`Rent for ${
                              utils.formatEther(
                                bookInfo.rentPricePerMonth || 0
                              ) *
                              10 ** 9
                            } Matic`}
                            theme="outline"
                          />
                        </div>
                      </div>

                      <p className="text-sm font-regular text-slate-500 mt-3">
                        *Note: Rent period is 1 Month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full mt-24 flex justify-center items-center">
              <p className="text-6xl font-extrabold">Book not found</p>
            </div>
          )}
          <Footer />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/2/24/Polygon_blockchain_logo.png"
            style={{ maxWidth: "800px" }}
          />
          <h1 className="text-3xl font-bold">
            Change your network to Mumbai Testnet
          </h1>
        </div>
      )}
    </>
  );
};

export default withRouter(BookInfo);
