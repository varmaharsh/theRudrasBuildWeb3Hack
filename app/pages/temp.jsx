import QRCode from "react-qr-code";
import { Button } from "web3uikit";
import { uploadFileToPinata } from "../utils";

const Temp = () => {
  const uploadQrToPinata = async () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    const ipfsHash = await uploadFileToPinata(pngFile);
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <div className="p-4 bg-white w-fit rounded-xl shadow-lg">
          <QRCode id="QRCode" value="https://example.com" />
          <Button text="Download QR" onClick={uploadQrToPinata} />
        </div>
      </div>
    </>
  );
};

export default Temp;
