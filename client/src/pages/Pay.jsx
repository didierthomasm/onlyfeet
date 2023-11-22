import styled from "styled-components";
import {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_CREDITS} from "../utils/mutations.js";
import {QUERY_ME} from "../utils/queries.js";
import Auth from "../utils/auth.js"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


const PayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85vw;
  height: 100%;
  background-color: white;
  //padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
`;

const Message = styled.p`
  color: ${props => props.$error ? 'red' : 'green'};
  font-size: 1rem;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreditDisplay = styled.div`
  margin: 10px 0;
  font-size: 1.2rem;
`;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

export function Pay() {
  const stripe = useStripe();
  const elements = useElements();

  // State for message
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    amount: 0,
  });

  // State for current credits
  const [currentCredits, setCurrentCredits] = useState(0);

  // Query for current credits
  const { data: userData } = useQuery(QUERY_ME);

  // Update current credits from query
  useEffect(() => {
    if (userData && userData.me) {
      setCurrentCredits(userData.me.credits);
    }
  }, [userData]);

  // Add credits mutation
  const [addCredits, { data, loading, error }] = useMutation(ADD_CREDITS, {
    onCompleted: (data) => {
      setMessage(`Successfully added ${formData.amount} credits.`);
      setCurrentCredits(data.addCredits.credits); // Update credits
    },
    onError: (error) => {
      // Handle GraphQL errors here
      setMessage(error.message);
    }
  });

  const userLoggedInId = Auth.getProfile().data._id;

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setMessage('');

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      setMessage('Stripe has not loaded yet. Please try again later.');
      setIsProcessing(false);
      return;
    }

    try {
      // Tokenize card details
      const cardElement = elements.getElement(CardElement);
      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        setMessage(error.message);
        setIsProcessing(false);
        return;
      }

      // Ensure amount is converted to an integer
      const amount = parseInt(formData.amount);
      if (!amount || amount <= 0) {
        setMessage("Please enter a valid amount to add credits.");
        setIsProcessing(false);
        return;
      }

      const {data} = await addCredits({
        variables: {
          userId: userLoggedInId,
          credits: amount
        },
      });

    } catch (err) {
      console.error(err);
      setMessage("Failed to add credits. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // For updating the message when there's an error
  useEffect(() => {
    if (error) {
      setMessage(error.message);
    }
  }, [error]);

  // This will clear the message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <PayContainer>
      <CreditDisplay>Current Credits: ${currentCredits}</CreditDisplay>
      <form onSubmit={handleFormSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <StyledInput
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleInputChange}
          value={formData.amount}
        />
        {message && <Message $error={!!error}>{message}</Message>}
        <StyledButton type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Add Credits'}
        </StyledButton>
      </form>
    </PayContainer>
  );
}