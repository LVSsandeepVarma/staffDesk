import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipcode: Yup.string().required('Zipcode is required'),
  country: Yup.string().required('Country is required'),
  address1: Yup.string().required('Address 1 is required'),
  address2: Yup.string(),
});

const PersonalDetailsForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      address1: '',
      address2: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission logic here
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h2>Personal Details</h2>
      <div className='row'>
        <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.phone && formik.errors.phone}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
      </Form.Group>
      </div>
      </div>

      <h2>Billing Address</h2>
      <div className='row'>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          placeholder="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.city && formik.errors.city}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          name="state"
          placeholder="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.state && formik.errors.state}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Zipcode</Form.Label>
        <Form.Control
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={formik.values.zipcode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.zipcode && formik.errors.zipcode}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.zipcode}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.country && formik.errors.country}
        >
          <option value="">Select Country</option>
          {/* Add country options here */}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Address 1</Form.Label>
        <Form.Control
          type="text"
          name="address1"
          placeholder="Address 1"
          value={formik.values.address1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.address1 && formik.errors.address1}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.address1}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          type="text"
          name="address2"
          placeholder="Address 2"
          value={formik.values.address2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.address2 && formik.errors.address2}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.address2}</Form.Control.Feedback>
      </Form.Group>
      </div>
      </div>

      <h2>Shipping Address</h2>
      <div className='row'>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          placeholder="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.city && formik.errors.city}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          name="state"
          placeholder="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.state && formik.errors.state}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Zipcode</Form.Label>
        <Form.Control
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={formik.values.zipcode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.zipcode && formik.errors.zipcode}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.zipcode}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.country && formik.errors.country}
        >
          <option value="">Select Country</option>
          {/* Add country options here */}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Address 1</Form.Label>
        <Form.Control
          type="text"
          name="address1"
          placeholder="Address 1"
          value={formik.values.address1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.address1 && formik.errors.address1}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.address1}</Form.Control.Feedback>
      </Form.Group>
      </div>
      <div className='col-md-4'>
      <Form.Group className="mb-3">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          type="text"
          name="address2"
          placeholder="Address 2"
          value={formik.values.address2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.address2 && formik.errors.address2}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.address2}</Form.Control.Feedback>
      </Form.Group>
      </div>
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default PersonalDetailsForm;
