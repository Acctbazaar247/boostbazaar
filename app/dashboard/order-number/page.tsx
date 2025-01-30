import ReviewForm from '@/components/dashboard/ReviewForm';
import SmsPoolService from '@/components/dashboard/SmsPoolService';
import AnimationWrapper from '@/components/ui/AnimationWrapper';

import React from 'react';

type Props = {};

const OrderNumberPage = (props: Props) => {
  return (
    <div>
      <AnimationWrapper>
        <div className="py-20 container">
          <SmsPoolService></SmsPoolService>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default OrderNumberPage;
