import { Link } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import { USER_SUBSCRIPTION } from '../utils/queries'; 

function OrderHistory() {
  const { data } = useSubscription(USER_SUBSCRIPTION);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Orders</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <p>No order details available</p>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
