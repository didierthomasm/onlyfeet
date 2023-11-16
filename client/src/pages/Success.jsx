import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { ORDER_SUCCESS_SUBSCRIPTION } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function Success() {
  const { data } = useSubscription(ORDER_SUCCESS_SUBSCRIPTION);

  useEffect(() => {
    async function handleOrderSuccess() {
      if (data && data.orderSuccess) {
        // Perform any necessary actions on successful order here
        // For instance, logging or other post-order actions

        // Redirect to home page after a successful order
        setTimeout(() => {
          window.location.assign('/');
        }, 3000);
      }
    }

    handleOrderSuccess();
  }, [data]);

  return (
    <div>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the home page</h2>
    </div>
  );
}

export default Success;
