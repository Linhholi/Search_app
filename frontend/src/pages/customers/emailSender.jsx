import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const EmailSender = ({ filteredCustomers }) => {

  const [loading, setLoading] = useState(false);


  const handleSendEmail = () => {
    setLoading(true);
    // Send the selected customer data to the backend for email sending
    axios
      .post('http://localhost:3001/api/send-emails', { customers: filteredCustomers })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        toast.success('Emails sent successfully to customers!', {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error('Failed to send emails. Please try again.', {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      });
  };

  return (
    <div className="div">
      <button className="button" onClick={handleSendEmail}>Send Email</button>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <ToastContainer />
    </div>
  );
}

export default EmailSender;