export default function Input({
  type,
  name,
  label,
  defaultValue,
  isReadOnly,
  isRequired,
}) {
  const is_hidden = type == "hidden" ? true : false;
  return (
    <>
      {!is_hidden && (
        <p>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            name={name}
            id={name}
            defaultValue={defaultValue}
            readOnly={isReadOnly ? true : undefined}
            required={isRequired ? true : undefined}
          />
        </p>
      )}
      {is_hidden && (
        <input type={type} name={name} id={name} value={defaultValue} />
      )}
    </>
  );
}
