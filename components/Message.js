import classes from "./Message.module.css";

export default function Message({ msg, typeOfMessage }) {
  const className = !typeOfMessage ? "classes.msgError" : "classes.msgSuccess";
  return (
    <p>
      <span className={className}>{msg}</span>
    </p>
  );
}
