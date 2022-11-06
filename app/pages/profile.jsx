import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import NftCard from "../components/NftCard";
import { getContract } from "../utils";
import {
  getArcanaProviderOrSigner,
  getLoggedInStatus,
  setHooks,
} from "../utils/storageProvider";
import { useAppContext } from "./_app";

const Profile = () => {
  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const [books, setBooks] = useState([]);
  // const [filteredBooks, setFilteredBooks] = useState(BOOKS);
  const { chainId, setChainId } = useAppContext();

  useEffect(() => {
    // if (!walletConnected) {
    // web3ModalRef.current = getWeb3Modal();
    onPageLoad();
    if (chainId === 80001) {
      getAllBooks();
    }
    // }
  }, [chainId]);

  async function onPageLoad() {
    let loggedIn = getLoggedInStatus();
    setLoggedIn(loggedIn);
    setHooks(setChainId);
  }

  async function getAllBooks() {
    try {
      const signer = await getArcanaProviderOrSigner(true);
      const contract = getContract(signer);
      const address = await signer.getAddress();

      const books = await contract.getAllBooksByUser(address);
      setBooks(books);
      console.log(books);
      // setFilteredBooks(books);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {console.log(chainId)}
      {chainId && chainId == 80001 ? (
        <>
          <NavBar loggedIn={loggedIn} />
          <div className="container mx-auto px-4 mt-10">
            <Header
              heading="Your Purchases"
              subHeading="Books you have bought on the market"
            />
            <div className="mt-16 flex flex-wrap justify-start w-full">
              {books?.map((book) => {
                if (book.ownership == 2 && book.expiryTimestamp < Date.now()) {
                  return;
                }
                return (
                  <NftCard
                    info={book}
                    key={book.id}
                    getAllBooks={getAllBooks}
                  />
                );
              })}
            </div>
          </div>
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

export default Profile;
