// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

error Invalid_Book_Id();
error Invalid_NFT_Id();
error Fees_Too_Low();
error Transfer_To_Author_Failed();
error Not_The_Owner();
error Not_For_Sale();

contract NFTBookStore is ERC721Enumerable {
    event NFT_Minted();

    struct Book {
        uint256 bookId;
        uint8 genre;
        uint32 physical_price;
        uint32 digital_price;
        uint32 rentPricePerMonth;
        uint16 authorPercentage;
        string book_name;
        address authorAddress;
        string authorName;
        string description;
        string uri;
    }

    struct NFTBook {
        uint256 tokenId;
        uint256 bookId;
        // ordered, shipped, delivered date
        uint256 timestamp;
        uint256 expiryTimestamp;
        uint8 deliveryStatus;
        uint32 deliveryCharge;
        uint32 sellingPrice;
        uint8 nftType;
        uint8 ownership;
        bool openForSale;
        string QRCode;
    }

    address private contractAddress;
    uint256 private tokenId = 1;
    uint256 private bookId = 1;
    uint32 private delivery_fees = 10**7;
    uint256[] private saleNFTTokenIds;

    mapping(uint256 => Book) private books;
    mapping(uint256 => NFTBook) private nftBooks;

    constructor() ERC721("NFT Book", "TMD") {}

    function setContractAddress(address _contractAddress) public {
        contractAddress = _contractAddress;
    }

    function addBook(
        uint8 genre,
        string memory book_name,
        address authorAddress,
        string memory authorName,
        uint32 physical_price,
        uint32 digital_price,
        uint32 rentPerMonth,
        uint16 authorPercentage,
        string memory description,
        string memory uri
    ) public {
        Book memory _book = Book(
            bookId,
            genre,
            physical_price,
            digital_price,
            rentPerMonth,
            authorPercentage,
            book_name,
            authorAddress,
            authorName,
            description,
            uri
        );
        books[bookId] = _book;
        bookId++;
    }

    function orderBook(
        uint256 _bookId,
        uint8 _nftType,
        uint256 _expiryTimestamp
    ) public payable {
        if (_bookId > bookId) {
            revert Invalid_Book_Id();
        }
        Book memory _book = books[_bookId];
        uint32 _bookPrice = _nftType == 2
            ? _book.digital_price
            : _book.physical_price;
        if (msg.value < _bookPrice + delivery_fees) {
            revert Fees_Too_Low();
        }
        uint32 _authorShare = (_book.authorPercentage * _bookPrice) / 100;
        payable(_book.authorAddress).transfer(_authorShare);

        uint8 _deliveryStatus = (_nftType == 2 ? 2 : 1);
        uint32 _delivery_fees = _nftType == 2 ? 0 : delivery_fees;
        uint8 _owner = _expiryTimestamp > 0 ? 2 : 1;
        NFTBook memory _nftBook = NFTBook(
            tokenId,
            _bookId,
            block.timestamp,
            _expiryTimestamp,
            _deliveryStatus,
            _delivery_fees,
            0,
            _nftType,
            _owner,
            false,
            ""
        );
        nftBooks[tokenId] = _nftBook;
        _safeMint(msg.sender, tokenId);
        tokenId++;
    }

    function markShippedOrDelivered(uint256 _tokenId, uint8 _deliveryStatus)
        public
    {
        if (_tokenId < tokenId) {
            revert Invalid_NFT_Id();
        }
        NFTBook memory _nftBook = nftBooks[_tokenId];
        _nftBook.deliveryStatus = _deliveryStatus;
        _nftBook.timestamp = block.timestamp;
        nftBooks[_tokenId] = _nftBook;
    }

    function getAllBooks() public view returns (Book[] memory) {
        Book[] memory allBooks = new Book[](bookId - 1);
        for (uint i = 1; i < bookId; i++) {
            allBooks[i - 1] = books[i];
        }
        return allBooks;
    }

    function getBookById(uint256 _bookId) public view returns (Book memory) {
        if (_bookId > bookId) {
            revert Invalid_Book_Id();
        }
        return books[_bookId];
    }

    function putNFTToSale(uint256 _tokenId, uint32 _sellingPrice) public {
        if (ownerOf(_tokenId) != msg.sender) {
            revert Not_The_Owner();
        }
        NFTBook memory _nftBook = nftBooks[_tokenId];
        _nftBook.openForSale = true;
        _nftBook.sellingPrice = _sellingPrice;
        nftBooks[_tokenId] = _nftBook;
        saleNFTTokenIds.push(_tokenId);
        setApprovalForAll(contractAddress, true);
        approve(contractAddress, _tokenId);
    }

    function getAllSecondHandBooks() public view returns (NFTBook[] memory) {
        NFTBook[] memory _nftBooks = new NFTBook[](saleNFTTokenIds.length);
        for (uint256 i = 0; i < saleNFTTokenIds.length; i++) {
            _nftBooks[i] = nftBooks[saleNFTTokenIds[i]];
        }
        return _nftBooks;
    }

    function orderSecondHandBook(uint256 _tokenId) public payable {
        if (ownerOf(_tokenId) == msg.sender) {
            revert Invalid_NFT_Id();
        }
        NFTBook memory _nftBook = nftBooks[_tokenId];
        if (_nftBook.openForSale == false) {
            revert Not_For_Sale();
        }

        payable(ownerOf(_tokenId)).transfer(_nftBook.sellingPrice);
        approve(ownerOf(_tokenId), msg.sender, _tokenId);
        transferFrom(ownerOf(_tokenId), msg.sender, _tokenId);

        _nftBook.openForSale = false;
        _nftBook.deliveryStatus = 1;
        _nftBook.timestamp = block.timestamp;
        nftBooks[_tokenId] = _nftBook;
    }

    function getAllBooksByUser(address _user)
        public
        view
        returns (NFTBook[] memory)
    {
        uint256 _totalBooks = balanceOf(_user);
        NFTBook[] memory _nftBooks = new NFTBook[](_totalBooks);
        for (uint256 i = 0; i < _totalBooks; i++) {
            uint256 _tokenId = tokenOfOwnerByIndex(_user, i);
            _nftBooks[i] = nftBooks[_tokenId];
        }
        return _nftBooks;
    }
}
