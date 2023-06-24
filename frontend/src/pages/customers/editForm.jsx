import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";

const EditForm = (props) => {
    let startDate = new Date();
    if (props.customer != null) {
        const [dd, mm, yyyy] = props.customer?.purchase_date.split('/');
        startDate = new Date(`${yyyy}/${mm}/${dd}`);
    }

    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        address: '',
        purchaseDate: new Date(),
        brand: '',
        model: '',
        type: '',
        email: '',
        active: '',
        directly_sold: ''
    });

    useEffect(() => {
        if (props.customer) {
            setFormValues({
                id: props.customer?.id,
                name: props.customer?.customer_name || '',
                address: props.customer?.address || '',
                purchaseDate: startDate,
                brand: props.customer?.brand,
                model: props.customer?.model,
                type: props.customer?.type,
                email: props.customer?.email,
                active: props.customer?.active,
                directly_sold: props.customer?.directly_sold
            });
        }
    }, [props.customer]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleDateChange = (date) => {
        setFormValues({
            ...formValues,
            purchaseDate: date
        });
    };

    const reFormatDate = (date) => {
        const dateString = date.substring(0, 10);
        const [yyyy, mm, dd] = dateString.split('-');
        return `${dd}/${mm}/${yyyy}`;
    }

    const handleSaveClick = () => {
        const formData = {
            id: formValues.id,
            customer_name: formValues.name,
            purchase_date: reFormatDate(formValues.purchaseDate.toISOString()),
            address: formValues.address,
            brand: formValues.brand,
            model: formValues.model,
            type: formValues.type,
            email: formValues.email,
            active: formValues.active,
            directly_sold: formValues.directly_sold
        };

        fetch('https://linh-react-backend.onrender.com/api/update-csv', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                props.onSuccess();
            })
            .catch(error => {
                props.onFail();
            });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Customer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="John Doe"
                            name='name'
                            value={formValues.name}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Address</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="JohnDoe@gmail.com"
                            name='email'
                            value={formValues.email}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="brand"
                            name='brand'
                            value={formValues.brand}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="model"
                            name='model'
                            value={formValues.model}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="type"
                            name='type'
                            value={formValues.type}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Active</Form.Label>
                        <Form.Control
                            as="select"
                            name='active'
                            onChange={handleInputChange}
                            value={formValues.active}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Directly Sold</Form.Label>
                        <Form.Control
                            as="select"
                            name='directly_sold'
                            onChange={handleInputChange}
                            value={formValues.directly_sold}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Purchase Date</Form.Label>
                        <DatePicker selected={formValues.purchaseDate} onChange={handleDateChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="success" onClick={() => handleSaveClick()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default EditForm;
