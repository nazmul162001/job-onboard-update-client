import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    // err handling for payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    // if (error) {
    //   setCardError(error.message);
    // }
    // else{
    //   setCardError("");
    // }
    setCardError(error?.message || "");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary w-full my-3"
          type="submit"
          disabled={!stripe}
        >
          Make a Payment{" "}
          <span>
            <i class="ri-bank-card-fill text-lg font-medium ml-2"></i>
          </span>
        </button>
      </form>
      {
        cardError && <p className="text-red-500 text-sm text-center">{cardError}</p>
      }
    </>
  );
};

export default CheckoutForm;
