const Message = ({ variant = "info", children }) => {
  const bgColor =
    variant === "danger"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700";

  return <div className={`p-4 rounded-lg mb-4 ${bgColor}`}>{children} </div>;
};
export default Message;
