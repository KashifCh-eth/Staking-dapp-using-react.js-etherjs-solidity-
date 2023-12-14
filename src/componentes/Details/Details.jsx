import { useContext } from "react";
import WalletContext from "../../store/store";

function Details() {
  const { isContract } = useContext(WalletContext);
  console.log("Contract from Det:", isContract);

  
  return <div>Details</div>;
}

export default Details;
