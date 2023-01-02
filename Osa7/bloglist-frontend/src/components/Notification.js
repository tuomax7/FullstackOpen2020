import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }
  return <div className={message[1] ? "success" : "error"}>{message[0]}</div>;
};

export default Notification;
