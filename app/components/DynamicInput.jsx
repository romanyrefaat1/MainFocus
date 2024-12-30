export default function DynamicInput({
  setInputVal,
  inputVal,
  isNum,
  ...props
}) {
  return (
    <input
      className="w-[350px] bg-transparent p-2 border border-gray-300"
      type={isNum ? "number" : `text`}
      onChange={(e) =>
        setInputVal(isNum ? Number(e.target.value) : e.target.value)
      }
      value={inputVal}
      {...(props.inputProps || {})}
    />
  );
}
