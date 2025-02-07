'use client';

import AnimationWrapper from '@/components/ui/AnimationWrapper';
import { config } from '@/config';
import Link from 'next/link';
import { BsRocketTakeoff } from 'react-icons/bs';
import { FaRocket, FaRocketchat } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { IoRocketSharp } from 'react-icons/io5';
import { MdOutlineTextsms } from 'react-icons/md';
import { useState } from 'react';
const Page = () => {
  const [show, setShow] = useState(true);
  return (
    <AnimationWrapper>
      <div className="container">
        {config.dashboardMessage?.startsWith(' ') ? null : show ? (
          <div className="bg-primary py-2 px-4 gap-2 rounded flex justify-between items-center mt-10">
            <p className=" rounded text-[#fff]">{config.dashboardMessage}</p>
            <button onClick={() => setShow(false)}>
              <FaX className="text-[#fff]"></FaX>
            </button>
          </div>
        ) : null}
        <div className=" mt-10">
          <h1 className="text-3xl font-semibold leading-tight text-primary  md:text-4xl mb-4">
            Welcome to Acctpanel
          </h1>
          <p className="text-lg light:text-gray-600 dark:text-gray-400 mb-8">
            Explore our services to boost your online presence and expand your
            communication capabilities.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2  ">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <IoRocketSharp className="text-xl text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Boost Your Social Media
              </h2>
              <p className=" light:text-gray-600 dark:text-gray-400 mb-4">
                Increase your followers, likes, and engagement across platforms.
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1 light:text-gray-600 dark:text-gray-400">
                <li>Gain more followers</li>
                <li>Increase post engagement</li>
                <li>Improve your online visibility</li>
              </ul>
              <Link
                href="/dashboard/order"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  bg-primary text-[#fff]"
              >
                Get Started
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <MdOutlineTextsms className="text-xl text-primary"></MdOutlineTextsms>
              </div>
              <h2 className="text-xl font-semibold mb-2">Buy Phone Numbers</h2>
              <p className="light:text-gray-600 dark:text-gray-400 mb-4">
                Get virtual phone numbers for your business or personal use.
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1 light:text-gray-600 dark:text-gray-400">
                <li>Local and international numbers</li>
                <li>Flexible plans and pricing</li>
                <li>Easy management and forwarding</li>
              </ul>
              <Link
                href="/dashboard/order-number"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  bg-primary text-[#fff]"
              >
                Explore Numbers
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Page;
