import classes from "./Modal.module.css";

export default function ErrorModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
