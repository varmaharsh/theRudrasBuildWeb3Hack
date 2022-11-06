import { utils } from "ethers";
import Image from "next/image";
import { genreMapper } from "../constants";

const BookCard = ({ info, onclick }) => {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white mx-4 my-4 shadow-sm cursor-pointer"
      style={{ width: "280px" }}
      onClick={onclick}
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
          <h2 className="font-semibold text-base text-slate-500">
            {info.book_name}
          </h2>
          <h2 className="text-2xl font-bold">{info.authorName}</h2>
          <p className="text-slate-500 text-sm">{genreMapper[info.genre]}</p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-500">Matic</h2>
          <p className="text-2xl font-bold">
            {utils.formatEther(info.physical_price || 0) * 10 ** 9}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
