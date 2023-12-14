import logo from "../../assets/logo.png";
import copy from "../../assets/copy.png";
import { useContext, useEffect, useState } from "react";
import Abi from "../../utils/Abi.json";
import BitAbi from "../../utils/bitToken.json";
import { ethers } from "ethers";
import WalletContext from "../../store/store";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";

// import WalletConnect from "@walletconnect/web3-provider";

// 1. Get projectId
const projectId = "138272b324615458b480a91ee8ec03c7";
const ContractAddress = "0xe07b53914c1BbE1b82786Aa65f5d38F45ae5bd84";
const BitBerryContractAddress = "0x3fe93409171873c45388ef80b3d0c14eee929108";
// const ContractAddress = "0xe49DCCB2A3EF78E2a5B105c83Ccb6B1D51FAa418";

// Detiles!
let contract;
let BitBerryContract;
let UserBalance;
let InvestedBalance;
let TotalStacked;
let isRewardClaimed;
let getReferralCount;
let getUserStakedAmount;

// 2. Set chains
const polygon = {
  chainId: 137,
  name: "Polygon Mainnet",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com",
};

// 3. Create modal
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnect,
//     options: {
//       projectId,
//     },
//   },
// };

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
    defaultChainId: 137,
  }),
  chains: [polygon],
  projectId,
  themeMode: "light",
});

function Methods() {
  const [istoggle, setIstoggle] = useState(false);
  const [value, setValue] = useState("");
  const [isinput, setinput] = useState(true);
  const [fee, setFee] = useState("");
  const [reff, setReff] = useState("");
  const [isclaim, setclaim] = useState(false);
  const [isclicked, setCLicked] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const ContractContext = useContext(WalletContext);

  // console.log("Contract Context :", ContractContext);
  // console.log(open);
  // console.log("FromAccount!", address, chainId, isConnected);

  async function conWeb3() {
    console.log(address, chainId, isConnected);
    setCLicked(true);
    const provider = new ethers.providers.Web3Provider(walletProvider);
    const signer = provider.getSigner();
    contract = new ethers.Contract(ContractAddress, Abi, signer);
    ContractContext.setContract({
      Contract: contract,
      IsOn: true,
    });

    BitBerryContract = new ethers.Contract(
      BitBerryContractAddress,
      BitAbi,
      signer
    );
    console.log("Bit", BitBerryContract);

    let Balance = await contract.checkUserBalance(address);
    UserBalance = ethers.utils.formatUnits(Balance, 19); // 1
    // console.log("UserBalance:", UserBalance.toNumber());
    let vlaue = await contract.getUserInvestedBalance(address);
    InvestedBalance = ethers.utils.formatUnits(vlaue, 19); // 1

    // GetReff = await contract.getReferrer(address);
    isRewardClaimed = await contract.isRewardClaimed(address);
    let ReferralCount = await contract.getReferralCount(address);
    getReferralCount = ethers.utils.formatUnits(ReferralCount);
    let Amount = await contract.getUserStakedAmount(address);
    getUserStakedAmount = ethers.utils.formatUnits(Amount, 19);

    TotalStacked = await contract.getTotalStaked();
    const ref = await contract.getReferrer(address);
    if (ref !== "0x000" && getReferralCount > 2) {
      setinput(true);
    } else {
      setinput(false);
    }
    // console.log("getUserStakedAmount :", getUserStakedAmount.toNumber());
    // console.log("InvestedBalance:", InvestedBalance.toNumber());
    // console.log("getReferralCount :", getReferralCount.toNumber());
    // console.log("isRewardClaimed:", isRewardClaimed);
    // console.log("TotalStacked:", TotalStacked.toNumber());
    // console.log("FeePer:", GetFeePer.toNumber());
    // console.log("Refff:", GetReff);
    // console.log("Provider", provider);
    // console.log("Signer", signer);
    // console.log("Contract!", contract);
    setIstoggle(true);
  }

  const FeePer = async () => {
    const GetFee = await contract.getFeePercentage();
    setFee(GetFee.toNumber());
  };

  const reffAcc = async () => {
    const ref = await contract.getReferrer(address);
    if (ref === "0x000") {
      setinput(true);
    } else {
      setinput(false);
    }
    setReff(ref);
  };

  const claiMReward = async () => {
    setclaim(true);
    try {
      const cl = await contract.claimReward();
      console.log(cl);
    } catch (error) {
      if (error.message && error.message.includes("revert")) {
        const revertMessage = error.message.split("revert")[1]; // Extract message after "revert"
        alert(revertMessage.slice(0, 30));
      } else {
        console.log("Unknown error occurred");
      }
    }
    setclaim(false);
  };

  const stack = async () => {
    try {
      if (!isinput && value) {
        const amountoftoken = await contract.STAKE_AMOUNT();
        // const Amt = am*2;
        const approveAmount = await BitBerryContract.approve(
          ContractAddress,
          amountoftoken
        );
        console.log("amount", approveAmount.hash);
        if (approveAmount) {
          const st = await contract.stake(value);
          console.log("st", st);
        }
      }else{
        alert("Enter Reffer First");
      }
    } catch (error) {
      if (error.message && error.message.includes("revert")) {
        const revertMessage = error.message.split("revert")[1]; // Extract message after "revert"
        alert(revertMessage.slice(0, 30));
      } else {
        console.log("Unknown error occurred", error);
        alert(error);
      }
    }
  };

  useEffect(() => {
    if (isConnected === true) {
      conWeb3();
    }
  }, [isConnected]);

  return (
    <div>
      <div className="p-5">
        <img src={logo} alt="logo" width="30px" />
        <h1 className="text-3xl">Welcome to the BitBerry Airdrop Experience</h1>
      </div>
      <div className="m-auto max-w-xs flex justify-center ">
        {/* <button
          type="button"
          className="p-2 border-2 bg-blue-400 cursor-pointer text-white hover:bg-transparent border-blue-400 hover:text-black"
          onClick={() => conWeb3()}
        >
          Connect Wallet
        </button> */}
        <div className="m-5">
          <w3m-button />
        </div>
      </div>

      <div>
        {isclicked ? (
          <>
            {istoggle ? (
              <>
                <div>
                  <div>
                    <div className="text-blue-800 text-2xl">
                      Balance: <span>{UserBalance?.toString()}</span>
                    </div>
                  </div>
                  <div className="p-5 ">
                    <div>
                      <div>
                        {isinput ? (
                          <>
                            <h1 className="">Referrals Found!</h1>
                          </>
                        ) : (
                          <>
                            <p className="p-4">
                              Enter Referral Address to Participate in Airdrop
                            </p>
                            <input
                              type="text"
                              placeholder="Enter your referrer's code."
                              className="p-1 outline-none text-center"
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => stack()}
                        className=" mt-5 text-white border-2 p-1 bg-blue-400 hover:bg-transparent hover:text-black border-blue-400 "
                      >
                        Participate in Airdrop
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-around mt-5 max-sm:flex-col shrink-0 ">
                    <div className="text-blue-800">
                      Invested Balance{" "}
                      <div className="text-black">
                        {/* {InvestedBalance?.toNumber()} */}
                        {InvestedBalance?.toString()}
                      </div>
                    </div>
                    <div className="text-blue-800">
                      Total Stacked{" "}
                      <div className="text-black">
                        {/* {TotalStacked?.toNumber()} */}
                        {TotalStacked?.toString()}
                      </div>
                    </div>
                    <div className="text-blue-800">
                      Claim Airdrop
                      <div className="text-black">
                        {" "}
                        {isRewardClaimed ? "Yes" : "No"}
                      </div>
                    </div>
                    <div className="text-blue-800">
                      You currently have referrals{" "}
                      <div className="text-black">
                        {/* {getReferralCount?.toNumber()} */}
                        {getReferralCount?.toString()}
                      </div>
                    </div>
                    <div className="text-blue-800">
                      Staked Amount{" "}
                      <div className="text-black">
                        {" "}
                        {getUserStakedAmount?.toString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="flex justify-around">
                      <div>
                        <button
                          onClick={() => reffAcc()}
                          // onClick={() =>  navigator.clipboard.writeText('Copy this text to clipboard')}
                          className=" text-white border-2 p-1 bg-blue-400 hover:bg-transparent hover:text-black border-blue-400 "
                        >
                          Get Referrer
                        </button>
                        <div className="p-2">
                          <p>
                            {reff ? (
                              <>
                                <div className="flex">
                                  {reff.slice(0, 5)}...{reff.slice(-6, -1)}
                                  <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={() => {
                                      navigator.clipboard.writeText(reff);
                                    }}
                                  >
                                    <img src={copy} alt="copy" width="20px" />
                                  </button>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => FeePer()}
                          className=" text-white border-2 p-1 bg-blue-400 hover:bg-transparent hover:text-black border-blue-400 "
                        >
                          Get Fee Percentage
                        </button>
                        <div className="p-2">
                          <p>{fee ? fee : <></>}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      {isclaim ? (
                        <>
                          <button
                            className=" text-white border-2 p-1 bg-blue-400 hover:bg-transparent hover:text-black border-blue-400 "
                            disabled
                          >
                            Loading...
                          </button>
                        </>
                      ) : (
                        <>
                          {!isinput ? (
                            <>
                              <p className="p-4">
                                To claim your airdrop, you need at least two
                                referrals.
                              </p>
                              <p className="p-2">
                                You currently have{" "}
                                {getReferralCount?.toString()} referrals. Earn
                                more to claim your airdrop rewards.
                              </p>
                            </>
                          ) : (
                            <></>
                          )}
                          <button
                            onClick={() => claiMReward()}
                            className=" text-white border-2 p-1 bg-blue-400 hover:bg-transparent hover:text-black border-blue-400 "
                          >
                            Claim Airdrop
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>Loading...</div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Methods;
