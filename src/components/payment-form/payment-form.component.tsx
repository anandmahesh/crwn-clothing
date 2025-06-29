import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./payment-form.styles";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  FormContainer,
  PaymentButtonContainer,
  PaymentFormContainer,
} from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { FormEvent, useState } from "react";
import { StripeCardElement } from "@stripe/stripe-js";

//Type Guard
const ifCardValidElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const amount = useSelector(selectCartTotal);

  const currentUser = useSelector(selectCurrentUser);

  const stripe = useStripe();

  const elements = useElements();

  const [isProcessingPayment, setProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 1000 }),
    }).then((resp) => resp.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    console.log(client_secret);

    const cardDetails = elements.getElement(CardElement);
    if (!ifCardValidElement(cardDetails)) {
      return;
    }

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setProcessingPayment(false);

    if (paymentResult.error) {
      alert(JSON.stringify(paymentResult.error));
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successfull");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButtonContainer>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            isLoading={isProcessingPayment}
          >
            {" "}
            Pay Now
          </Button>
        </PaymentButtonContainer>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
