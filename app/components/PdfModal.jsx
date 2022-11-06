import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Modal } from "web3uikit";

const PdfModal = ({ showModal, setShowModal, pdfLink }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      <Modal
        cancelText="Discard Changes"
        id="regular"
        isVisible={showModal}
        okText="Save Changes"
        hasFooter={false}
        onCancel={function noRefCheck() {}}
        onCloseButtonPressed={() => setShowModal(false)}
        onOk={function noRefCheck() {}}
      >
        <div className="pb-10">
          {console.log(pdfLink)}
          <Document file={`${pdfLink}`} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default PdfModal;
