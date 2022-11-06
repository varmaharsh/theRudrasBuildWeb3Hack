const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

const books = [
  [
    1,
    1,
    "Psychology Of Money",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Morgan Housel",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3012&q=80",
  ],
  [
    2,
    2,
    "How Inovation Works",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Matt Ridley",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2112&q=80",
  ],
  [
    3,
    3,
    "The Picture Of Dorian Gray",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Osca Wilde",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  ],
  [
    4,
    4,
    "How To Do Most Of It",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Carrie Collins",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images-workbench.99static.com/DOlO8wYqMxunU6aC7Cdjh95JPy0=/http://s3.amazonaws.com/projects-files/80/8020/802039/aa80ac01-69fc-4306-b848-f6a9d6401c54.jpg",
  ],
  [
    5,
    5,
    "Blues For The Muse",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Stephen Altman",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images-workbench.99static.com/mvVwrJc4HC0tnQZClkm81DaUCag=/http://s3.amazonaws.com/projects-files/108/10868/1086886/2e3266ec-cdcf-4382-bb0a-cadc132c96b9.jpg",
  ],
  [
    6,
    6,
    "Add Cynaide To Taste",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Karmen Spiljak",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images-workbench.99static.com/43weDs-X0Wlq76dJkMUsSKnMF8c=/http://s3.amazonaws.com/projects-files/103/10362/1036268/13449902-1942-4580-a4b3-fd011764e9c2.jpg",
  ],
  [
    7,
    7,
    "Faithful Nomad",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Lisa Szkatulski",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images-workbench.99static.com/mkpIJ1L3LR3PiNPpNJJ5PJFo_Hg=/http://s3.amazonaws.com/projects-files/97/9756/975633/6b294b54-895e-46eb-8d80-f0e83adb0921.jpg",
  ],
  [
    8,
    8,
    "Book Of the Cold",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Antonio Gamoneda",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images-workbench.99static.com/jGoLSk_UDoRd2WUPbw5UNIlgk5M=/http://s3.amazonaws.com/projects-files/121/12143/1214347/dd92af19-c5e5-439c-b700-e05b701e0759.jpg",
  ],
  [
    9,
    9,
    "You Deserve This Shit",
    "0x17ab14d818c78eb72a34debde4bd48c8f25c8dde",
    "Jordan Traver",
    20000000,
    10000000,
    1000000,
    50,
    "Mollit sunt aute nulla veniam reprehenderit ea nulla laboris fugiat ipsum occaecat. Pariatur irure non duis in nulla veniam mollit. Ullamco esse in enim mollit aute aliqua ut.",
    "https://images-workbench.99static.com/Klb_CHruRCTyJ5MiLJ2iA0tabkw=/99designs-contests-attachments/110/110480/attachment_110480397",
  ],
];

async function main() {
  const nftBookStoreContract = await ethers.getContractFactory("NFTBookStore");

  // deploy the contract
  const deployedContract = await nftBookStoreContract.deploy();

  await deployedContract.deployed();
  // print the address of the deployed contract
  console.log("Deployed Contract Address:", deployedContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
