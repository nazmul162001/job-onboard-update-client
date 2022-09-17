import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API } from "../../../config";

const Payment = () => {
  const { paymentId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState({})

  console.log(paymentId)
  
useEffect(()=> {
    fetch(`${BASE_API}/paymentInfo/${paymentId}`)
    .then((res) => res.json())
    .then((data) => setPaymentDetails(data));
},[paymentId])

// console.log(paymentDetails)

  return <div>{paymentDetails._id}</div>;
};

export default Payment;
