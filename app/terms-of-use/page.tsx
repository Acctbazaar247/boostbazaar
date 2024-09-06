import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-3">

      <h1 className="text-4xl text-primary/70 font-bold mb-6 text-center pt-4">Terms of Use</h1>
      <h3 className='text-center pb-4 font-semibold'>Last Updated: September 2024</h3>
      <hr />
      
      <p className="mb-4 mt-6">
        By placing an order with <strong>AcctPanel</strong>, you automatically accept all the terms of service listed below, whether you read them or not.
      </p>
      
      <p className="mb-4">
        We reserve the right to change these terms of service without notice. You are expected to read all terms of service before placing any order to ensure you are up to date with any changes or any future changes.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Usage Agreement</h2>
      <p className="mb-4">
        You will only use the AcctPanel website in a manner which follows all agreements made with Instagram, Facebook, Twitter, YouTube, or other social media sites on their individual Terms of Service pages.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Rates and Delivery</h2>
      <p className="mb-4">
        AcctPanel rates are subject to change at any time without notice. The payment/refund policy remains in effect in the case of rate changes.
      </p>
      <p className="mb-4">
        AcctPanel does not guarantee a delivery time or a drop rate for any services. We offer our best estimation for when the order will be delivered. This is only an estimation, and AcctPanel will not refund orders that are processing if you feel they are taking too long.
      </p>
      <p className="mb-4">
        All orders without a refill period are not refillable, even if they face a 100% drop. Please order services with a refill option.
      </p>
      <p className="mb-4">
        AcctPanel strives to deliver exactly what is expected by our re-sellers. However, we reserve the right to change a service type if necessary to complete an order.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Account Suspension</h2>
      <p className="mb-4">
        Any malicious or abusive actions can result in your account being suspended. Before suspension, users will be given time to use their remaining balance. Opening a new account after suspension will result in the termination of your account, even if it has a balance.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
      <p className="mb-4">
        AcctPanel will not be responsible for any damages you or your business may suffer.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Liabilities</h2>
      <p className="mb-4">
        AcctPanel is in no way liable for any account suspension or picture deletion done by Instagram, Twitter, Facebook, YouTube, or any other social media platform.
      </p>
    </div>
  );
};

export default TermsOfUse;
