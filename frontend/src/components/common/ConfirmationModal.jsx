import { AnimatePresence, motion } from "framer-motion";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="flex w-fit flex-col gap-4 border-2 border-red-600 p-4">
      <p>{message}</p>
      <div className="flex justify-center gap-4">
        <button onClick={onConfirm}>Confirm</button>
        <button
          onClick={onCancel}
          className="hover:border-red-600 hover:text-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
