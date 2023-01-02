import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }

  return (
    <div className="container">
      <Alert variant={message[1] ? "success" : "danger"}>{message[0]}</Alert>
    </div>
  );
};

export default Notification;
