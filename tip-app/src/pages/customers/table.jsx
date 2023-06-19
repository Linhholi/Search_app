import React, { useState } from 'react'
import "./table.css"
import "react-datepicker/dist/react-datepicker.css";
import EditForm from "./editForm";

const Table = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [customer, setCustomer] = useState(null);

    const handleClick = (customer) => {
        setModalShow(true);
        setCustomer(customer);
    }

    const onSuccess = () => {
        props.successUpdated();
        setModalShow(false);
    }

    const onFail = () => {   
        props.failedUpdate(); 
        setModalShow(false);
    }

    return (
        <div>
            <table id='customers'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Purchase Date</th>
                        <th>Active</th>
                        <th>Directly Sold</th>
                        <th>Address</th>
                        <th>Tunning Date</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.purchase_date}</td>
                            <td>{item.active}</td>
                            <td>{item.directly_sold}</td>
                            <td>{item.address}</td>
                            <td>{item.tunning_date}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.type}</td>
                            <td>{item.email}</td>
                            <td><button className='button' onClick={() => handleClick(item)}>Update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalShow && (
                <EditForm
                    show={modalShow}
                    customer={customer}
                    onSuccess={onSuccess}
                    onFail={onFail}
                    onHide={() => setModalShow(false)}
                />
            )}
        </div>
    )
}

export default Table;