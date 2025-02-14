import ReviewForm from '@/components/dashboard/ReviewForm';
import SmsPoolService from '@/components/dashboard/SmsPoolService';
import UserBalanceAndSpend from '@/components/dashboard/UserBalanceAndSpend';
import AnimationWrapper from '@/components/ui/AnimationWrapper';

import React from 'react';

type Props = {};

const OrderNumberPage = (props: Props) => {
  return (
    <div>
      <AnimationWrapper>
        <div className="py-20 container">
          <UserBalanceAndSpend></UserBalanceAndSpend>
          <div className="mt-10">
            <SmsPoolService></SmsPoolService>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default OrderNumberPage;
