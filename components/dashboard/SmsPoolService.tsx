'use client';
import React, { useEffect, useMemo } from 'react';
import { ChevronDown, Search, Globe, EyeOff, Sun, Moon } from 'lucide-react';
import AppFormSelect from '../ui/AppFormSelect';
import { Select } from 'antd';
import {
  useGetSmsPoolCountryByServiceQuery,
  useGetSmsPoolsQuery,
} from '@/redux/features/smsPool/smsPoolApi';
import Loading from '../ui/Loading';
import { TSmsPoolService, TSmsPoolServiceCountry } from '@/types';
import SingleSmsPoolService from './SingleSmsPoolService';
import AppErrorComponent from '../ui/AppErrorComponent';

type Props = {};

const SmsPoolService = (props: Props) => {
  const [selectedService, setSelectedService] = React.useState<string | null>(
    null,
  );
  const [isServiceOpen, setIsServiceOpen] = React.useState(false);
  const [pricingOption, setPricingOption] = React.useState<
    'cheapest' | 'highest'
  >('highest');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('lowest');
  const [showAllCountries, setShowAllCountries] = React.useState(false);
  const [allServices, setAllServices] = React.useState<TSmsPoolService[]>([]);
  const { data: smsPools, isLoading, isError } = useGetSmsPoolsQuery({});
  const {
    data: smsPoolCountryByService,
    isLoading: isLoadingSmsPoolCountryByService,
    isFetching: isFetchingSmsPoolCountryByService,
    isError: isErrorSmsPoolCountryByService,
  } = useGetSmsPoolCountryByServiceQuery(selectedService, {
    skip: !selectedService,
  });
  useEffect(() => {
    if (smsPools?.data) {
      setAllServices(smsPools?.data);
    }
  }, [smsPools]);
  // add use memo for handling all filtering like pricingOption, sortOrder, searchQuery, showAllCountries
  const filteredData = useMemo(() => {
    const filterByCountry = smsPoolCountryByService?.data?.filter(
      (single: TSmsPoolServiceCountry) => {
        return single.name.toLowerCase().includes(searchQuery.toLowerCase());
      },
    );
    if (filterByCountry?.length) {
      // sort by pricing option if cheapest then sort by lowest success rate
      const sortByPricingOptionFn = (data: TSmsPoolServiceCountry[]) => {
        if (pricingOption === 'cheapest') {
          return data.sort(
            (a: TSmsPoolServiceCountry, b: TSmsPoolServiceCountry) =>
              a.success_rate - b.success_rate,
          );
        } else {
          return data.sort(
            (a: TSmsPoolServiceCountry, b: TSmsPoolServiceCountry) =>
              b.success_rate - a.success_rate,
          );
        }
      };
      const sortByFn = (data: TSmsPoolServiceCountry[]) => {
        if (sortOrder === 'lowest') {
          return data.sort(
            (a: TSmsPoolServiceCountry, b: TSmsPoolServiceCountry) =>
              Number(a.price) - Number(b.price),
          );
        } else {
          return data.sort(
            (a: TSmsPoolServiceCountry, b: TSmsPoolServiceCountry) =>
              Number(b.price) - Number(a.price),
          );
        }
      };
      const filterBySortOrder = sortByFn(filterByCountry);
      const sortByPricingOption = sortByPricingOptionFn(filterBySortOrder);
      if (!showAllCountries) {
        return sortByPricingOption.filter(
          (single: TSmsPoolServiceCountry) => single.stock > 0,
        );
      }
      return sortByPricingOption;
    }
    return [];
  }, [
    smsPoolCountryByService,
    searchQuery,
    pricingOption,
    sortOrder,
    showAllCountries,
  ]);

  if (isError) {
    return (
      <div>
        <AppErrorComponent></AppErrorComponent>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div>
      <div className={`w-full  `}>
        <div className="    rounded-lg shadow-ldg  transition-colors duration-200">
          <div className="space-y-6">
            {/* Header and Dark Mode Toggle */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Configure Order
                </h2>
                <p className="text-sm text-gray ">
                  Select your service preferences and filter options
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-lg   break-words  pb-2  ">Service</label>
                <Select
                  placeholder="Select a service"
                  showSearch={true}
                  optionFilterProp="label"
                  onChange={selectedService => {
                    setSelectedService(selectedService);
                  }}
                  className="text-[20px]"
                  value={selectedService || null}
                  options={allServices.map((single: TSmsPoolService) => ({
                    label: single.name,
                    value: single.ID,
                  }))}
                ></Select>
              </div>
              {/* Country Search */}
              <div className="space-y-2">
                <label className="font-medium text-black">Search Country</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search for a country"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 text-[16px] pr-4 py-4 border border-gray-600 light:border-gray-300 focus:shadow-none rounded-lg  bg-transparent  text-black transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
            {/* Pricing Options and Sort Options in the same row */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1 space-y-2">
                  <label className=" font-medium text-black">
                    Pricing Option
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPricingOption('highest')}
                      className={`sms-pool-service-toggle-single-button
                      ${
                        pricingOption === 'highest'
                          ? 'sms-pool-service-toggle-single-button-active'
                          : 'sms-pool-service-toggle-single-button-inactive'
                      }`}
                    >
                      Highest Success Rate
                    </button>
                    <button
                      onClick={() => setPricingOption('cheapest')}
                      className={`sms-pool-service-toggle-single-button
                      ${
                        pricingOption === 'cheapest'
                          ? 'sms-pool-service-toggle-single-button-active'
                          : 'sms-pool-service-toggle-single-button-inactive'
                      }`}
                    >
                      Select Cheapest
                    </button>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text font-medium text-black ">
                    Sort By
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSortOrder('lowest')}
                      className={`sms-pool-service-toggle-single-button
                      ${
                        sortOrder === 'lowest'
                          ? 'sms-pool-service-toggle-single-button-active'
                          : 'sms-pool-service-toggle-single-button-inactive'
                      }`}
                    >
                      Lowest Price
                    </button>
                    <button
                      onClick={() => setSortOrder('highest')}
                      className={`sms-pool-service-toggle-single-button
                      ${
                        sortOrder === 'highest'
                          ? 'sms-pool-service-toggle-single-button-active'
                          : 'sms-pool-service-toggle-single-button-inactive'
                      }`}
                    >
                      Highest Price
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Toggle for Show/Hide Countries Without Stock */}
            <div className="flex items-center justify-between bg-transparent border border-gray-600 light:border-gray-300  rounded-lg p-4 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                {showAllCountries ? (
                  <Globe className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                ) : (
                  <EyeOff className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                )}
                <div>
                  <h3 className="text-sm font-medium text-black">
                    Country Stock Visibility
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {showAllCountries
                      ? 'Showing all countries'
                      : 'Hiding countries without stock'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAllCountries(!showAllCountries)}
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                style={{
                  backgroundColor: showAllCountries ? '#5d5fdf' : '#E5E7EB',
                }}
              >
                <span
                  className={`${
                    showAllCountries ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isFetchingSmsPoolCountryByService || isLoadingSmsPoolCountryByService ? (
        <div>
          {/* add skeleton */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-64 rounded bg-gray-200 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData?.map(
            (single: TSmsPoolServiceCountry, index: number) => (
              <SingleSmsPoolService
                selectedService={selectedService || ''}
                key={index}
                data={single}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default SmsPoolService;
