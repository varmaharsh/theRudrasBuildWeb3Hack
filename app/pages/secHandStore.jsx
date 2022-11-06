import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Footer, Header, NavBar } from "../components";
import SecHandBookCard from "../components/seHandBookCard";
import { filterBooks, getContract } from "../utils";
import {
  getArcanaProviderOrSigner,
  getAuthInstance,
  getLoggedInStatus,
  setHooks,
} from "../utils/storageProvider";
import { useAppContext } from "./_app";

const SecHandStore = () => {
  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);
  // const [chainId, setChainId] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const auth = getAuthInstance();
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
      const provider = await getArcanaProviderOrSigner();
      const contract = getContract(provider);

      const nfts = await contract.getAllSecondHandBooks();
      const books = await contract.getAllBooks();
      const finalNfts = [];
      for (const nft of nfts) {
        const temp = {};
        Object.keys(nft).forEach((key) => {
          temp[key] = nft[key];
        });

        const book = books.find(
          (book) => book.bookId.toString() === nft.bookId.toString()
        );
        if (book) {
          temp.uri = book.uri;
          temp.book_name = book.book_name;
        }
        finalNfts.push(temp);
      }
      console.log(finalNfts);
      setBooks(finalNfts);
      setFilteredBooks(finalNfts);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilterBooks = (filter, searchText) => {
    const temp = filterBooks(filter, searchText, books);
    setFilteredBooks(temp);
  };

  return (
    <>
      {chainId && chainId == 80001 ? (
        <>
          <NavBar loggedIn={loggedIn} />
          <div className="container mx-auto px-4 mt-10">
            <Header
              heading="Explore Books"
              subHeading="Browse through our collection of books"
              showFilters={true}
              filterBooks={handleFilterBooks}
            />
            <div className="mt-16 flex flex-wrap justify-start w-full">
              {filteredBooks?.map((book, i) => {
                // console.log(book);
                return (
                  <SecHandBookCard
                    info={book}
                    key={i}
                    onclick={() => {
                      router.push(`/book/${book?.bookId?.toString()}`);
                    }}
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

export default SecHandStore;
