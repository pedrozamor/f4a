import classes from "./Message.module.css";

export default function Message({ msg, typeOfMessage }) {
  return (
    <p>
      <span className={!typeOfMessage ? classes.msgError : classes.msgSuccess}>
        {msg}
      </span>
    </p>
  );
}
