import { Alert } from "react-bootstrap";

export const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} className="text-center">
      {children}
    </Alert>
  );
}

Message.defaultProps = {
  variant: "info",
};

export default Message;