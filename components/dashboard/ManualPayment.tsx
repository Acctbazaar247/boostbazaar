import React, { useEffect, useState } from 'react';
import { PiCurrencyDollarBold } from 'react-icons/pi';
import AppInput from '../ui/AppInput';
import Image from 'next/image';
import AppFormSelect from '../ui/AppFormSelect';
import { useGetCryptoBanksQuery } from '@/redux/features/cryptoBank/cryptoBankApi';
import { useGetBanksQuery } from '@/redux/features/bank/bankApi';
import { QRCode, Select, Spin } from 'antd';
import { toast } from 'react-toastify';
import { FaBanSmoking, FaCalculator, FaNairaSign } from 'react-icons/fa6';
import {
  FaCheckCircle,
  FaDollarSign,
  FaExclamationCircle,
  FaPiggyBank,
  FaUserFriends,
} from 'react-icons/fa';
import { useAddManualCurrencyRequestMutation } from '@/redux/features/manualCurrencyRequest/manualCurrencyRequestApi';
import { config } from '@/config';
import AppImageUpload from '../ui/AppImageUpload';
import { Bank } from '@/types';
import { CryptoBank } from '@/types';
import { CiBank } from 'react-icons/ci';
import { RiExchangeDollarLine } from 'react-icons/ri';

type Props = {
  setPaymentType: (paymentType: 'online' | 'manual' | null) => void;
};
type UserBankInfo = {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
};
const ManualPayment = ({ setPaymentType }: Props) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<
    'bank' | 'crypto' | null
  >(null);
  const [cryptoInfo, setCryptoInfo] = useState<CryptoBank | null>(null);
  const [bankInfo, setBankInfo] = useState<Bank | null>(null);
  const [userBankInfo, setUserBankInfo] = useState<UserBankInfo | null>(null);
  const [isBank, setIsBank] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>('');
  const { data: cryptoBanks, isLoading: cryptoLoading } =
    useGetCryptoBanksQuery({ limit: 1000, isActive: true });
  const { data: bankBanks, isLoading: bankLoading } = useGetBanksQuery({
    limit: 1000,
    isActive: true,
  });
  const [submitManualPayment, { isLoading: submitManualPaymentLoading }] =
    useAddManualCurrencyRequestMutation();
  const handleContinue = () => {
    if (step === 1) {
      if (selectedOption === 'bank') {
        if (!bankInfo?.id) {
          toast.error('Please select a bank');
          return;
        }
        if (amount < config.manualDepositMinMoney) {
          toast.error(`Minimum amount is ${config.manualDepositMinMoney}`, {
            toastId: 'min-amount',
          });
          return;
        }
        setStep(2);
      } else {
        if (!cryptoInfo?.id) {
          toast.error('Please select a crypto ');
          return;
        }
        // check amount
        if (amount < config.manualDepositMinMoney) {
          toast.error(`Minimum amount is ${config.manualDepositMinMoney}`, {
            toastId: 'min-amount',
          });
          return;
        }
        setStep(2);
      }
    } else if (step === 2) {
      if (selectedOption === 'bank') {
        if (!bankInfo?.id) {
          toast.error('Please select a bank');
          return;
        }
        if (amount < config.manualDepositMinMoney) {
          toast.error(`Minimum amount is ${config.manualDepositMinMoney}`, {
            toastId: 'min-amount',
          });
          return;
        }
        setStep(3);
      } else if (selectedOption === 'crypto') {
        if (!cryptoInfo?.id) {
          toast.error('Please select a crypto type');
          return;
        }
        {
          if (!transactionHash) {
            toast.error('Please enter your transaction hash');
            return;
          }
          if (!cryptoInfo?.id) {
            toast.error('Please select a crypto type');
            return;
          }
          submitManualPayment({
            requestedAmount: amount,
            cryptoBankId: cryptoInfo?.id,
            transactionHash: transactionHash,
          })
            .unwrap()
            .then(res => {
              toast.success('Manual payment request submitted successfully');
              setStep(3);
            })
            .catch(err => {
              toast.error(err?.data?.message || 'Something went wrong');
            });
        }
      }
    } else if (step === 3) {
      // check is bank
      if (selectedOption === 'bank') {
        //  check if userBankInfo is full field
        if (
          !userBankInfo?.bankName ||
          !userBankInfo?.accountName ||
          !userBankInfo?.accountNumber
        ) {
          toast.error('Please fill all the fields');
          return;
        }
        if (!image) {
          toast.error('Please upload your bank receipt');
          return;
        }
        if (imageLoading) {
          return;
        }
        submitManualPayment({
          requestedAmount: amount,
          bankId: bankInfo?.id,
          bankName: userBankInfo?.bankName,
          accountName: userBankInfo?.accountName,
          accountNumber: userBankInfo?.accountNumber,
          image: image,
        })
          .unwrap()
          .then(res => {
            toast.success('Manual payment request submitted successfully');
            setStep(4);
          })
          .catch(err => {
            toast.error(err?.data?.message || 'Something went wrong');
          });
      }
    }
  };

  const STEP_1 = (
    <>
      <AppInput
        icon={<PiCurrencyDollarBold />}
        type="number"
        placeholder="Enter Amount"
        value={amount.toString()}
        setValue={e => setAmount(parseFloat(e.target.value))}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <button
          onClick={e => {
            e.stopPropagation();
            setSelectedOption('bank');
          }}
          className={`gap-5 p-4 border border-borderColor cursor-pointer rounded-lg transition-all w-full text-left ${
            selectedOption === 'bank' ? 'border-primary' : ''
          }`}
        >
          <div className="flex gap-5">
            <div className="min-w-[36px]">
              <CiBank className="text-primary text-4xl" />
            </div>
            <div className="space-y-1 w-full">
              <h3 className="text-textBlack font-bold">Bank Transfer</h3>
              <p className="text-sm text-textGrey">
                Make a deposit using bank transfer to our available bank
                options.
              </p>
              {selectedOption === 'bank' && (
                <div className="text-sm text-textGrey mt-2 w-full">
                  {bankLoading ? (
                    <Spin className="h-10 w-full" />
                  ) : (
                    <div className="w-full mt-2">
                      <Select
                        value={bankInfo?.id}
                        onChange={e => {
                          setBankInfo(
                            bankBanks?.data?.find(
                              (bank: Bank) => bank.id === e,
                            ) || null,
                          );
                        }}
                        className="my-select w-full h-10 mt-1"
                        placeholder="Select Bank"
                        options={bankBanks?.data?.map((bank: Bank) => ({
                          label: (
                            <span className="text-[16px]">{bank.bankName}</span>
                          ),
                          value: bank.id,
                        }))}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </button>
        <button
          onClick={() => {
            setSelectedOption('crypto');
            setIsBank(false);
          }}
          className={`flex gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
            selectedOption === 'crypto' ? 'border-primary' : ''
          }`}
        >
          <div className="min-w-[36px]">
            <RiExchangeDollarLine className="text-primary text-4xl" />
          </div>
          <div className="space-y-1">
            <h3 className="text-textBlack font-bold">Crypto Payment</h3>
            <p className="text-sm text-textGrey">
              Deposit popular cryptocurrencies like BTC, USDT, BNB, and more.
            </p>
            <div>
              {selectedOption === 'crypto' ? (
                <div>
                  {cryptoLoading ? (
                    <Spin className="h-10 w-full" />
                  ) : (
                    <div className="w-full mt-2">
                      <Select
                        value={cryptoInfo?.id || null}
                        onChange={e => {
                          setCryptoInfo(
                            cryptoBanks?.data?.find(
                              (bank: CryptoBank) => bank.id === e,
                            ) || null,
                          );
                        }}
                        className="my-select w-full h-10 mt-1"
                        placeholder="Select crypto"
                        options={cryptoBanks?.data?.map((bank: CryptoBank) => ({
                          label: (
                            <span className="text-[16px]">{bank.name}</span>
                          ),
                          value: bank.id,
                        }))}
                      />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </button>
      </div>
    </>
  );
  const STEP_2 = (
    <div>
      {selectedOption === 'bank' ? (
        <div>
          <div className="flex flex-col items-center justify-center w-full bg-primary/[0.1]  py-5 rounded">
            <p className="text-2xl font-bold flex gap-2 items-center text-primary">
              {' '}
              <FaNairaSign /> {amount * config.manualDollarRate}
            </p>
            <p className="text-sm text-textGrey">
              You have to transfer{' '}
              <span className="text-primary">
                {amount * config.manualDollarRate}
              </span>{' '}
              Naira to the selected bank
            </p>
          </div>
          <div className="space-y-2 mt-4">
            <h2 className="text-center text-xl font-bold">Bank Details</h2>
            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => {
                  navigator?.clipboard
                    ?.writeText(bankInfo?.bankName || '')
                    .then(() =>
                      toast.success('Copied to clipboard', {
                        toastId: 'copy-bank-name',
                      }),
                    );
                }}
                className="border cursor-pointer  border-borderColor text-center   p-2 rounded-lg"
              >
                <h3 className="font-semibold ">Bank Name</h3>
                <p>{bankInfo?.bankName}</p>
              </div>

              <div
                onClick={() => {
                  navigator?.clipboard
                    ?.writeText(bankInfo?.accountName || '')
                    .then(() =>
                      toast.success('Copied to clipboard', {
                        toastId: 'copy-account-name',
                      }),
                    );
                }}
                className="border cursor-pointer border-borderColor text-center p-2 rounded-lg"
              >
                <h3 className="font-semibold text-center">Account Name</h3>
                <p>{bankInfo?.accountName}</p>
              </div>
              <div
                onClick={() => {
                  navigator?.clipboard
                    ?.writeText(bankInfo?.accountNumber || '')
                    .then(() =>
                      toast.success('Copied to clipboard', {
                        toastId: 'copy-account-number',
                      }),
                    );
                }}
                className="border cursor-pointer border-borderColor col-span-2 p-2 text-center rounded-lg"
              >
                <h3 className="font-semibold text-center">Account Number</h3>
                <p>{bankInfo?.accountNumber}</p>
              </div>
            </div>
            <div className=" py-2">
              <p className="text-sm text-textGrey">
                {' '}
                <span className="text-primary">*</span>{' '}
                {`By clicking I've made payment, you agree that you have sent the money to the selected bank and have your payment receipt.`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center w-full bg-primary/[0.1]  py-5 rounded">
            <p className="text-2xl font-bold flex gap-2 mb-2 text-primary items-center">
              {' '}
              <FaDollarSign /> {amount}
            </p>
            <p className="text-sm text-textGrey">
              Please transfer <span className="text-primary">${amount}</span>{' '}
              {cryptoInfo?.name} to the designated crypto wallet provided.
            </p>
          </div>

          <div className="mt-5">
            <h2 className="text-center font-bold">Wallet Address</h2>
            <div className="flex justify-center items-center">
              <QRCode value={cryptoInfo?.walletAddress || ''} />
            </div>
            <p
              onClick={() => {
                navigator?.clipboard
                  ?.writeText(cryptoInfo?.walletAddress || '')
                  .then(() =>
                    toast.success('Copied to clipboard', {
                      toastId: 'copy-wallet-address',
                    }),
                  );
              }}
              className="text-center cursor-pointer mt-2 py-2 bg-yellowShadow rounded  text-sm text-textBlack"
            >
              {cryptoInfo?.walletAddress}
            </p>
          </div>
          {/* add input for taking transaction hash */}
          <div className="mt-5">
            <h2 className="mb-1 font-bold">
              Enter your Transaction Hash or TXID
            </h2>
            <AppInput
              icon={<FaCalculator />}
              type="text"
              placeholder="Transaction Hash"
              value={transactionHash || ''}
              setValue={e => setTransactionHash(e.target.value)}
            />
          </div>
          <div className="flex border border-primary rounded-lg p-2 items-center gap-2 mt-3">
            {/* <span className='text-red-500'>*</span> */}
            <div className=" md:min-w-[20px]">
              <FaExclamationCircle className="text-primary  text md:text-2xl" />
            </div>
            <p className="text-xs text-textGrey">
              Submit this receipt only once with the transaction reference to
              receive your deposit. Submitting twice or with another account may
              result in a block and loss of funds.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const STEP_4 = (
    <div className="flex justify-center py-10 items-center flex-col gap-2 ">
      <div className="flex justify-center items-center flex-col gap-2 ">
        <FaCheckCircle className="text-primary text-6xl" />
      </div>
      <h3 className="text-xl font-bold">Payment Request Submitted</h3>
      <p className="text-sm text-textGrey w-[80%] text-center">
        Your payment request has been submitted successfully. We will review
        your request and notify you via email once it is approved.
      </p>
    </div>
  );

  const STEP_3 = (
    <div>
      {selectedOption === 'bank' ? (
        <div>
          <div className="text-center">
            <h3 className="text-lg  font-bold">Enter your Bank Details</h3>
            <p className="text-sm mb-4 text-textGrey">
              Please enter your bank details to complete the payment
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <AppInput
                icon={<FaPiggyBank />}
                type="text"
                placeholder="Bank Name"
                value={userBankInfo?.bankName || ''}
                setValue={e =>
                  setUserBankInfo(prevState => ({
                    ...prevState,
                    bankName: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <AppInput
                icon={<FaUserFriends />}
                type="text"
                placeholder="Account Name"
                value={userBankInfo?.accountName || ''}
                setValue={e =>
                  setUserBankInfo(prevState => ({
                    ...prevState,
                    accountName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-span-2">
              <AppInput
                icon={<FaCalculator />}
                type="text"
                placeholder=" Account Number"
                value={userBankInfo?.accountNumber || ''}
                setValue={e =>
                  setUserBankInfo(prevState => ({
                    ...prevState,
                    accountNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-span-2">
              <AppImageUpload
                placeholder="Upload Bank Receipt"
                name="bank-receipt"
                onChange={setImage}
                setImageLoading={setImageLoading}
              />
            </div>
          </div>
          <div className="flex border border-primary rounded-lg p-2 items-center gap-2 mt-3">
            {/* <span className='text-red-500'>*</span> */}
            <div className=" md:min-w-[20px]">
              <FaExclamationCircle className="text-primary  text md:text-2xl" />
            </div>
            <p className="text-xs text-textGrey">
              Submit this receipt only once with the transaction reference to
              receive your deposit. Submitting twice or with another account may
              result in a block and loss of funds.
            </p>
          </div>
        </div>
      ) : (
        <div>{STEP_4}</div>
      )}
    </div>
  );

  return (
    <div className=" space-y-4 pt-10">
      <h2 className="text-3xl text-primary">Manual payment </h2>
      {step === 1 ? STEP_1 : step === 2 ? STEP_2 : step === 3 ? STEP_3 : STEP_4}

      <div className="flex mt-4 gap-3">
        {/* back button */}
        {step === 4 || (selectedOption === 'crypto' && step === 3) ? null : (
          <button
            className="border  border-gray-600 text-textBlack px-4 py-2 rounded-lg"
            onClick={() => {
              if (step === 1) {
                setPaymentType(null);
              } else {
                setStep(step - 1);
              }
            }}
          >
            Back
          </button>
        )}
        <button
          disabled={imageLoading || submitManualPaymentLoading}
          className=" rounded-lg  px-7 py-2 bg-primary   text-[#fff]  hover:opacity-80 transition-all disabled:opacity-80"
          onClick={() => {
            if (step === 4) {
              setPaymentType(null);
            } else if (step === 3) {
              if (selectedOption === 'crypto') {
                setPaymentType(null);
              } else {
                handleContinue();
              }
            } else {
              handleContinue();
            }
          }}
        >
          {submitManualPaymentLoading ? (
            <Spin />
          ) : step === 2 && selectedOption === 'bank' ? (
            'I’ve made payment.'
          ) : step === 2 && selectedOption === 'crypto' ? (
            'Submit'
          ) : step === 3 ? (
            selectedOption === 'crypto' ? (
              'Back'
            ) : (
              ' Submit'
            )
          ) : step === 4 ? (
            'Back'
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default ManualPayment;
