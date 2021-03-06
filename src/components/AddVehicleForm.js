import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Formik } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from './Dropdown'

const schema = yup.object({
  vin: yup.string().required(),
  make: yup.string().required(),
  model: yup.string().required(),
  year: yup.number().required().positive().integer()
});

const emptyOption = { value: "", label: "" };

function RedirectRoute(context) {
    return <Redirect to={context.state.redirect} />
}

function FormHtml(context) {
    return (
        <Container className="add-vehicle-form-container">
            <h1>Add Vehicle</h1>
            <Formik
            validationSchema={schema}
            initialValues={{ 
                vin: null,
                make: null,
                model: null,
                year: null
            }}
            validate={values => {
                const errors = {};
                if (!values.vin) {
                    errors.vin = 'VIN is required';
                } else if (context.props.vehicles.find(vehicle => vehicle.vin === values.vin)) {
                    errors.vin = 'VIN already exists. Please enter a different VIN.'
                }
                if (!values.make) {
                    errors.make = 'Make is required';
                }
                if (!values.model) {
                    errors.model = 'Model is required';
                }
                if (!values.year) {
                    errors.year = 'Year is required';
                } else if (isNaN(values.year)) {
                    errors.year = 'Year must be a number';
                }
                return errors;
            }}
            onSubmit = {(values, { setSubmitting }) => {                               
                context.props.addVehicle(
                    values.vin, 
                    values.make, 
                    values.model,
                    values.year);
                setTimeout(() => context.setState({"redirect": "/"}), 1000);
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                isSubmitting
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="vin">
                        <Form.Label column sm={1}>VIN:</Form.Label>
                        <Col sm={8}>
                            <Form.Control 
                                type="text"
                                name="vin" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.vin} />
                            <Form.Control.Feedback type="invalid">{errors.vin}</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="make">
                        <Form.Label column sm={1}>Make:</Form.Label>
                        <Col sm={8}>
                            <Dropdown
                                name="make"
                                options={context.state.makeOptions}
                                value={values.make}
                                onChange={(field, value) => {
                                    const newMakeValue = value.value;
                                    const shouldResetDependentSelect = newMakeValue !== context.state.prevMake;
                                    context.setState({ prevMake: newMakeValue }, () => {
                                        setFieldValue(field, value);
                                        context.updateModelOptions(value.value);
                                        if (shouldResetDependentSelect) {
                                            setFieldValue("model", emptyOption);
                                        }
                                    });
                                }}
                                onBlur={setFieldTouched}
                                error={errors.make}
                                touched={touched.make}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="model">
                        <Form.Label column sm={1}>Model:</Form.Label>
                        <Col sm={8}>
                            <Dropdown
                                name="model"
                                isDisabled={!values.make}
                                options={
                                    values.make ? context.state.modelOptions : []
                                }
                                value={values.model}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                error={errors.model}
                                touched={touched.model}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="year">
                        <Form.Label column sm={1}>Year:</Form.Label>
                        <Col sm={8}>
                            <Form.Control 
                                type="text"
                                name="year" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.year} />
                            <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Button type="submit" disabled={isSubmitting}>Submit</Button>
                </Form>
                )}
            </Formik>
        </Container>
    )
}

class AddVehicleForm extends Component {
    constructor(props) {
		super(props)

		this.state = {
            redirect: null,
            prevMake: null,
            makeOptions: [],
            modelOptions: []
        }
    }	
    componentDidMount = () => {
        this.props.fetchMakes();

        this.setState({makeOptions: this.props.makes});
    }
    updateModelOptions(makeId) {
        fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" + makeId + "?format=json")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    modelOptions: result.Results.map(model => {
                        return { value: model.Model_ID, label: model.Model_Name.trim() };
                    })
                });
            });
    }
    render() {
        if (this.state.redirect) {
            return RedirectRoute(this)
        }

        return FormHtml(this)
    }
}

export default AddVehicleForm