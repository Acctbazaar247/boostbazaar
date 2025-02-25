import { config } from '@/config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiBank, CiBitcoin } from 'react-icons/ci';
import { FaPiggyBank } from 'react-icons/fa';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

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
  handleBankClick,
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
          <div className="flex gap-4 mt-4 flex-col md:flex-row">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                // toast.error('Currently not available', { toastId: '1' });
                if (handleBankClick) {
                  handleBankClick();
                }
                setSelectedOption('korapay');
                // router.push("https://nowpayments.io/payment/?iid=4613115863");
              }}
              className={`gap-5 p-4 border border-borderColor cursor-pointer rounded-lg transition-all w-full text-left ${
                selectedOption === 'korapay' ? 'border-primary' : ''
              }`}
            >
              <div className="flex gap-5">
                <div className="min-w-[36px]">
                  <CiBank className="text-primary text-4xl" />
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex items-center gap-4">
                    <h3 className="text-textBlack font-bold">
                      Bank/Card Payment
                    </h3>
                    <p className="text-primary">Minimum ${config.minAddFund}</p>
                  </div>
                  <p className="text-sm text-textGrey">
                    Deposit funds directly using Bank transfer or card payment.
                  </p>
                </div>
              </div>
            </button>
            {/* <button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (handleCryptoClick) {
                  handleCryptoClick();
                }
                setSelectedOption('nowpayment');
                // router.push("https://nowpayments.io/payment/?iid=4613115863");
              }}
              className={`w-full py-4 hidden px-2 border rounded transition-all ${
                selectedOption === 'nowpayment'
                  ? 'border-primary bg-primary/10 text-primary shadow'
                  : 'text-dark-grey border-dark-grey'
              }`}
            >
              
                <div className="flex justify-center mb-4">
                  <CiBitcoin className="text-[60px]" />
                </div>
                <p className="mt-2 ">
                  Pay with Crypto ($) Via USDT, Bitcoin, LTC, Sol, BNB, etc..
                </p>
              </div>
            </button> 
            
            */}
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (handleCryptoClick) {
                  handleCryptoClick();
                }
                setSelectedOption('nowpayment');
                // router.push("https://nowpayments.io/payment/?iid=4613115863");
              }}
              className={`flex gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
                selectedOption === 'nowpayment' ? 'border-primary' : ''
              }`}
            >
              <div className="min-w-[36px]">
                <RiExchangeDollarLine className="text-primary text-4xl" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-textBlack font-bold">Crypto Payment</h3>
                  <p className="text-primary">
                    Minimum ${config.minAddFundCrypto}
                  </p>
                </div>
                <p className="text-sm text-textGrey">
                  Deposit popular cryptocurrencies like BTC, USDT, BNB, and
                  more.
                </p>
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
