import React from "react";
import Methods from "../Web3Connect/Methods";

function Dis() {
  return (
    <div>
      <div className="text-center font-medium p-5 max-w-5xl m-auto">
        <h1 className="text-2xl text-green">Join Us Today!</h1>
        <p>
          "| Embrace the potential of DeFi with BitBerry. Stake, earn, and grow
          in a thriving crypto ecosystem. Our platform is not just about
          rewards; it’s about being part of a community that’s shaping the
          future of finance.""
        </p>
      </div>
      {/* <Methods /> */}
      <div className="font-medium flex justify-between max-sm:flex-col shrink-0">
        {/* 1th */}
        <div className="p-2">
          <ol>
            <li className="text-2xl pe-2">Staking BTB Tokens</li>
            <ul>
              <li className=" text-green-900">1. How to Stake</li>
              <p>
                ➡ To participate, simply stake your BTB tokens through our
                platform. Our staking process is straightforward and secure,
                ensuring a hassle-free experience.
              </p>
              <li className=" text-green-900">2. Stake Amount</li>
              <p>
                ➡ A fixed amount of 5,000 BTB tokens is required for staking.
                This initiates your participation and makes you eligible for
                rewards.
              </p>
              <li className=" text-green-900">3. Referral Program</li>
              <p>
                ➡ Enhance your earnings by referring new users. When a new user
                stakes using your referral, you both benefit.
              </p>
              <li className=" text-green-900">
                4. Double Stakes for Whitelisted Addresses{" "}
              </li>
              <p>
                ➡ If you are on our whitelist, your staked amount automatically
                doubles, increasing your potential rewards.
              </p>
            </ul>
          </ol>
        </div>
        {/* 2th */}
        <div className="p-2">
          <ol>
            <li className="text-2xl pe-2">Earning Rewards</li>
            <ul>
              <li className=" text-green-900">1. Referral Count </li>
              <p>
                ➡ To claim rewards, you need to have at least two referrals who
                have also staked tokens..
              </p>
              <li className=" text-green-900">2. Reward Calculation</li>
              <p>
                ➡ Your reward equals double your staked amount. However, a 10%
                fee is deducted from the total reward for platform maintenance
                and development.
              </p>
            </ul>
          </ol>
        </div>
        {/* 3th */}
        <div className="p-2">
          <ol>
            <li className="text-2xl pe-2">Claiming Rewards</li>
            <ul>
              <li className=" text-green-900">1. Simple Claim Process </li>
              <p>
                ➡ Once you meet the criteria, you can claim your rewards
                directly from the platform..
              </p>
              <li className=" text-green-900">2. Reward Distribution</li>
              <p>
                ➡ After deducting the 10% fee, the remaining reward is
                transferred to your wallet.
              </p>
            </ul>
          </ol>
        </div>
        {/* 4th */}
        <div className="p-2">
          <ol>
            <li className="text-2xl pe-2">Withdrawing Your Stake</li>
            <ul>
              <li className=" text-green-900">1. Withdrawal Conditions </li>
              <p>
                ➡ ou can withdraw your staked tokens provided you have fewer
                than two referrals..
              </p>
              <li className=" text-green-900">2. Processing Fee</li>
              <p>
                ➡ A 10% fee is charged on the initial staked amount during
                withdrawal..
              </p>
              <li className=" text-green-900">2. Withdrawal Procedure</li>
              <p>
                ➡ Follow simple steps on our platform to withdraw your staked
                BTB tokens. The amount, minus the fee, is transferred back to
                your wallet..
              </p>
            </ul>
          </ol>
        </div>
        {/* 5th */}
        <div className="p-2">
          <ol>
            <li className="text-2xl pe-2">Additional Features</li>
            <ul>
              <li className=" text-green-900">1. Security and Transparency </li>
              <p>
                ➡ Our platform leverages the robust security of blockchain
                technology, ensuring transparency and safety for your assets.
              </p>
              <li className=" text-green-900">2. Continuous Support</li>
              <p>
                ➡ Our dedicated team is here to assist you throughout your
                journey in the BitBerry ecosystem.
              </p>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Dis;
