import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./customers.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './table';
import { CSVLink } from 'react-csv'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateNewForm from './createNewForm';


const Customers = () => {

  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "customer_name" },
    { label: "Purchase Date", key: "purchase_date" },
    { label: "Active", key: "active" },
    { label: "Directly Sold", key: "directly_sold" },
    { label: "Address", key: "address" },
    { label: "Tunning Date", key: "tunning_date" },
    { label: "Brand", key: "brand" },
    { label: "Model", key: "model" },
    { label: "Type", key: "type" }
  ];

  const [customers, setData] = useState([]);
  const [query_address, setQuery_address] = useState("");
  const [query_name, setQuery_name] = useState("");
  const [query_date, setQuery_date] = useState("");

  const search = (data) => {

    // format date from database
    const formater_data = (date) => {
      const dateParts = date.toString().split("/");
      // month is 0-based, that's why we need dataParts[1] - 1
      return new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
    }

    // format input date
    const formater_input = (date) => {
      const dateParts = date.toString().split("-");
      return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
    }

    if (data === null || data.length === 0) {
      return [];
    }

    let query = data;
    if (query_address !== "") {
      query = query.filter(item => item.address.toLowerCase().includes(query_address))
    }

    if (query_name !== "") {
      query = query.filter(item => item.customer_name.toLowerCase().includes(query_name))
    }

    if (query_date !== "") {
      query = query.filter(item => formater_data(item.purchase_date).toString() === formater_input(query_date).toString())
    }

    return query;
  }

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/api/get-customers');
    setData(response.data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSuccessUpdate = () => {
    toast.success('Updated successfully', {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });

    fetchData();
  }

  const onFailedUpdate = () => {
    toast.error('Failed to update. Please try again.', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
  }

  const [showForm, setShowForm] = useState(false);
  const onSuccessCreate = () => {
    toast.success('Created successfully', {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });

    fetchData();
    setShowForm(false);
  }

  const onWarning = (message) => {
    toast.warning(message, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
  }

  const onFailedCreate = () => {
    toast.error('Failed to create. Please try again.', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });

    setShowForm(false);
  }

  return (
    <div>
      <Navbar />
      <div className="search">
        <div className="searchAddress">  
        <FontAwesomeIcon icon={faMapLocationDot} className="Icon" />
          <input
            type="text"
            placeholder="Customer's address"
            className="searchAddressInput"
            onChange={(e) => setQuery_address(e.target.value.toLowerCase())}
          />
        </div>
        <div className="searchName">
          <FontAwesomeIcon icon={faUser} className="Icon" />
          <input
            type="text"
            placeholder="Customer's name"
            className="searchNameInput"
            onChange={(e) => setQuery_name(e.target.value.toLowerCase())}
          />
        </div>

        <div className="searchDate">
          <FontAwesomeIcon icon={faCalendarDays} className="Icon" />
          <input
            type='date'
            className='searchDateInput'
            onChange={(e) => setQuery_date(e.target.value)}
            placeholder="Purchase date"
          
          />
        </div>
      </div>
      <div className="floatingbutton">
        <button className='button' onClick={() => setShowForm(true)}>Create New</button>
        {showForm && (
          <CreateNewForm
            show={showForm}
            onHide={() => setShowForm(false)}
            onSuccess={onSuccessCreate}
            onFail={onFailedCreate}
            onWarning={onWarning}
          />
        )}
        <CSVLink
          data={search(customers)}
          headers={headers}
          filename={"CustomersInfor.csv"}
          target="_blank">
          <button className="button">Export CSV</button>
        </CSVLink>
      </div>
      <Table
        data={search(customers)}
        successUpdated={onSuccessUpdate}
        failedUpdate={onFailedUpdate} />
      <ToastContainer />
      <Footer />
    </div>
  )
}
export default Customers;
