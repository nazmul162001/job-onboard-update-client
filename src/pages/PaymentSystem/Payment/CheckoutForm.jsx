import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { BASE_API } from "../../../config";

const CheckoutForm = ({ paymentDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const { price } = paymentDetails;

  useEffect(() => {
    fetch(`${BASE_API}/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

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
    setSuccess("");

    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "Getting Premium Membership",
          },
        },
      });
    // set error
    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      setSuccess("Congratulation! 🎉 Your Payment is success. ");
    }
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
          disabled={!stripe || !clientSecret}
        >
          Make a Payment{" "}
          <span>
            <i class="ri-bank-card-fill text-lg font-medium ml-2"></i>
          </span>
        </button>
      </form>
      {cardError && (
        <p className="text-red-500 text-sm text-center">{cardError}</p>
      )}
      {success && (
        <div>
          <p className="text-green-500 text-sm text-center">{success}</p>
          <p className="text-green-500 text-sm text-center font-bold">Your Transaction Id: <span className="text-black opacity-50">{transactionId}</span> </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
