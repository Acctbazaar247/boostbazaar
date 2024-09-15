import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiBank, CiBitcoin } from "react-icons/ci";

type Props = {
  onChange?: (option: string | null) => void;
  handleCryptoClick?: () => void;
  handleBankClick?: () => void;
  isDisabled?: boolean;
  description?: string;
};

const PaySelection = ({
  onChange,
  handleCryptoClick,
  isDisabled,
  description,
  handleBankClick
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption, onChange]);
  const router = useRouter();
  return (
    <div>
      <div className=" ">
        <div className=" mt-2">
          <h1 className="text-xl font-semibold mb-1">Choose Payment Option</h1>
          {description ? <p className="">{description}</p> : null}
          {/* Radio buttons for payment options */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (handleBankClick) {
                  handleBankClick();
                }
                setSelectedOption("flutterwave");
                // router.push("https://nowpayments.io/payment/?iid=4613115863");
              }}
              className={`w-full py-4 px-2 border rounded transition-all disabled:opacity-90 ${
                selectedOption === "flutterwave"
                  ? "border-primary bg-primary/10 text-primary shadow"
                  : "text-dark-grey border-dark-grey"
              }`}
            >
              <div>
                {/* <img src="" alt="" /> */}
                <div className="flex justify-center mb-4">
                  <CiBank className="text-[60px]" />
                </div>

                {/* <FontAwesomeIcon
                  className="text-5xl"
                  icon={faBank}
                ></FontAwesomeIcon> */}
                <p className="mt-2 ">Bank / Card Payment</p>
              </div>
            </button>
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (handleCryptoClick) {
                  handleCryptoClick();
                }
                setSelectedOption("nowpayment");
                // router.push("https://nowpayments.io/payment/?iid=4613115863");
              }}
              className={`w-full py-4 px-2 border rounded transition-all ${
                selectedOption === "nowpayment"
                  ? "border-primary bg-primary/10 text-primary shadow"
                  : "text-dark-grey border-dark-grey"
              }`}
            >
              <div>
                {/* <img src="" alt="" /> */}
                {/* <FontAwesomeIcon
                  className="text-5xl"
                  icon={faCoins}
                ></FontAwesomeIcon> */}
                <div className="flex justify-center mb-4">
                  <CiBitcoin className="text-[60px]" />
                </div>
                <p className="mt-2 ">Crypto Payment</p>
              </div>
            </button>
          </div>

          {/* Content based on the selected option */}
          {/* {selectedOption === "bank" && (
            <div className="border p-4 rounded text-center bg-white">
              <p className="text-center text-xl font-bold">Coming soon!</p>
            </div>
          )} */}

          {/* {selectedOption === "crypto" && (
            <div className="border p-4 rounded bg-white">
              <p className="text-center text-xl mb-2">Crypto Payment Details</p>
              <strong>Bitcoin wallet -</strong>
              bc1qssf3erlnus8x268app9eqrn2yyumx9u7h0gtu2
              <br />
              <span className="my-4 inline-block">
                <strong> USDT (BEP 20) BNB smart chain -</strong>
                0x00Cff15A2204df44aA9E3685E53901Ee53a7f918
              </span>
              <br />
              <strong>USDT (TRC 20) -</strong>{" "}
              TNZ9zzNxow7H6GqADpnjNMcSxzrwbxmxYM
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PaySelection;
