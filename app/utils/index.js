import axios from "axios";
import { Contract, providers } from "ethers";
import Web3Modal from "web3modal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

export const uploadFileToPinata = async (pngFile) => {
  try {
    let response = await fetch(pngFile);
    let blob = await response.blob();
    let file = new File([blob], "qr.png", { type: "image/png" });
    const data = new FormData();
    data.append("file", file);
    data.append("pinataOptions", '{"cidVersion": 1}');
    data.append(
      "pinataMetadata",
      '{"name": "Book QR code", "keyvalues": {"bookName": "The Alchemist"}}'
    );
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NjYyYjZmNy1jNmJhLTRmODctYTE4Zi1mM2E1NTc3MTE2ZmEiLCJlbWFpbCI6ImpoZW1hbnQ1MzlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ3ZWIzNDRlYTEzYTk1NTg0MmZhIiwic2NvcGVkS2V5U2VjcmV0IjoiM2M4ZDA3ODM1MGQ1ZDFmYmU1ZTZkZGIzNThmN2RhYWY4MjY0OWYxOTE5M2YwMmZiODJhZTQ3YzgwNjZjNzE2YyIsImlhdCI6MTY2NzY0MTM5N30.WMe7hIRTF0ktD8y4rIC1m43iJAPrJOx2rZySEygoqyA",
      },
      data,
    };
    const res = await axios(config);
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export const getWeb3Modal = () => {
  let modal = new Web3Modal({
    network: "mumbai",
    providerOptions: {},
    disableInjectedProvider: false,
  });
  return modal;
};

export async function getProviderOrSigner(web3ModalRef, needSigner = false) {
  const provider = await web3ModalRef.current.connect();
  const web3Provider = new providers.Web3Provider(provider);

  const { chainId } = await web3Provider.getNetwork();
  if (chainId !== 80001) {
    window.alert("Change the network to mumbai");
    throw new Error("Change network to mumbai");
  }

  if (needSigner) {
    return web3Provider.getSigner();
  }

  return web3Provider;
}

export const getContract = (signerOrProvider) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
};

export const filterBooks = (filter, searchText, books) => {
  let filterBooks;
  switch (filter) {
    case "book_name":
    case "authorName":
    case "genre":
      filterBooks = books.filter((book) =>
        book[filter].toLowerCase().includes(searchText.toLowerCase())
      );
      break;

    case "physical_price":
      filterBooks = books.filter(
        (book) => parseFloat(book.price) <= parseFloat(searchText)
      );
      break;

    default:
      filterBooks = books;
      break;
  }

  return filterBooks;
};
