import { useContext } from "react";
import { BasketContext } from "../../../context/BasketContext";

const withContext = (WrappedComponent) => {
  return (props) => {
    const { baskets, setBaskets } = useContext(BasketContext);

    return (
      <WrappedComponent baskets={baskets} setBaskets={setBaskets} {...props} />
    );
  };
};

export default withContext;
