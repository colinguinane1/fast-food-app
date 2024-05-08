import Backdrop from "./Backdrop";

interface ItemData {
  itemImageURL: string;
  itemName: string;
  itemDescription: string;
  itemBasePrice: number;
  // Add other properties as needed
}

interface ModalProps {
  itemData: ItemData;
  toggleModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ itemData, toggleModal }) => {
  console.log("Modal itemData:", itemData); // Add this line

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      toggleModal(); // Close the modal only if the click target is the backdrop
    }
  };

  return (
    <main>
      <div onClick={handleClose}>
        <Backdrop />
      </div>
      <div className="fixed inset-0 max-w-[800px] mx-4 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <img
            className="w-22 h-20"
            src={itemData.itemImageURL}
            alt={itemData.itemName}
          />
          <div className="border-b mb-2">
            <h1 className="font-extrabold text-2xl">{itemData.itemName}</h1>
            <p className="text-sm">{itemData.itemDescription}</p>
            <h1 className="">${itemData.itemBasePrice}</h1>
          </div>
          <button className="bg-green-500 hover:bg-green-700 rounded-full px-4 p-1 text-white">
            Add
          </button>
        </div>
      </div>
    </main>
  );
};

export default Modal;
