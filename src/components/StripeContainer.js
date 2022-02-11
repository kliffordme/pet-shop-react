import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
const StripeContainer = ({ setCart, cart, setShowItem, showItem}) => {
    // const options = {
    //     clientSecret: '{{CLIENT_SECRET}}'
    // }
    const stripePromise = loadStripe('pk_test_51KQ3uOFqPdthnSsxydH8PynoAaoL3iFBKBvGvu5jwTga5YjJJWFMNx0bYRXw7EO9SzXLxoTCgMybci80Px4XerJO00YzeqJQjQ')

  return <Elements stripe={stripePromise}>
      <CheckoutForm cart={cart} setShowItem={setShowItem} showItem={showItem} />
  </Elements>;
};

export default StripeContainer;
