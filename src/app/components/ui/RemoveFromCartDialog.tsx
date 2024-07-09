interface RemoveFromCartDialogProps {
  selectedItem: any;
  toggleCancelCartRemove: () => void;
  removeFromCart: (item: any) => void;
  toggleCartRemove: () => void;
}

import { motion } from "framer-motion";
const RemoveFromCartDialog: React.FC<RemoveFromCartDialogProps> = ({
  selectedItem,
  toggleCancelCartRemove,
  removeFromCart,
  toggleCartRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed no_transition top-0 h-screen w-screen bg-black bg-opacity-40"
    >
      {" "}
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ delay: 0.2 }}
          className="flex no_transition flex-col text-left  w-60 mt-[50%] p-2 px-4 bg-white rounded-lg"
        >
          <div>
            {" "}
            <h1 className="font-semibold text-xl py-3">Remove from Cart?</h1>
            <p className="pb-1">{selectedItem.name}</p>
          </div>

          <div className="flex py-3 justify-between gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCancelCartRemove}
              className="no_transition bg-slate-200 font-semibold p-2 rounded-lg w-full"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                removeFromCart(selectedItem);
                toggleCartRemove();
              }}
              className="bg-red-500 no_transition text-white font-semibold p-2 rounded-lg w-full"
            >
              Remove
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RemoveFromCartDialog;
