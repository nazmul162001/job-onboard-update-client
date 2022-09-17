import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API } from "../../../config";
import visa from "../../Assets/images/payment/Visa-icon.png";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51L1PV2GTjQFJmthfZb1lh0BvUivcqdcBSncRDHe4E0xVhweALHl42jEK8J8b7wEsUvUQ32eCPfaeUe7oAUuy832i00CuXFquFK"
);

const Payment = () => {
  const { paymentId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState({});

  console.log(paymentId);

  useEffect(() => {
    fetch(`${BASE_API}/paymentInfo/${paymentId}`)
      .then((res) => res.json())
      .then((data) => setPaymentDetails(data));
  }, [paymentId]);

  // console.log(paymentDetails)

  return (
    <div className="make-payment flex justify-center items-center w-full h-screen">
      <div className="w-2/5 bg-base-100 shadow-xl p-4">
        <div className="c-body">
          <h2 className="c-title text-3xl font-bold">Upgrade Your Plan</h2>
          <p>
            Please Upgrade your plan for lifetime by using any card payment.
          </p>
          <div className="pricing-card flex justify-between items-center p-3 border-2 my-3 rounded">
            <div className="pricing-title flex items-center">
              <div className="pricing_image">
                <i class="ri-currency-fill text-4xl mr-2"></i>
              </div>
              <div className="pricing_description">
                <h4 className="pricing_category text-lg font-medium">
                  Upgraded to{" "}
                  <span className="font-bold">{paymentDetails.category}</span>
                </h4>
                <h5 className="text-gray opacity-60">Enjoy Lifetime</h5>
              </div>
            </div>
            <div className="pricing-amount text-2xl font-bold">
              ${paymentDetails.price}
            </div>
          </div>
          {/* payment method  */}
          <div className="payment-method">
            <h2 className="font-bold">Available Payment Method</h2>
            <div className="pricing-title flex items-center">
              <div className="pricing_image">
                <img className="w-28 h-20 mr-3" src={visa} alt="" />
              </div>
              <div className="pricing_description">
                <h4 className="pricing_category text-lg font-medium">
                  Pay with Visa Card
                </h4>
                <h5 className="text-gray opacity-60">
                  Make sure before you payment
                </h5>
              </div>
            </div>
          </div>
          <div className="payment-for">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
          {/* <div className="c-actions">
            <button className="btn btn-primary w-full">Make a Payment</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Payment;
