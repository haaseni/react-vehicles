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
    newMake: yup.string().required(),
    newModel: yup.string().required(),
    newYear: yup.number().required().positive().integer()
});

const emptyOption = { value: "", label: "" };

function RedirectRoute(context) {
    return <Redirect to={context.state.redirect} />
}

function FormHtml(context) {
    return (
        <Container className="edit-vehicle-form-container">
            <h1>Edit Vehicle</h1>
            <Formik
            validationSchema={schema}
            initialValues={{ 
                vehicle: context.state.vehicle,
                newMake: context.state.vehicle.make, 
                newModel: context.state.vehicle.model,
                newYear: context.state.vehicle.year
            }}
            validate={values => {
                const errors = {};
            
                if (!values.newMake) {
                    errors.newMake = 'Make is required';
                }
                if (!values.newModel) {
                    errors.newModel = 'Model is required';
                }
                if (!values.newYear) {
                    errors.newYear = 'Year is required';
                } else if (isNaN(values.newYear)) {
                    errors.newYear = 'Year must be a number';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {                               
                context.props.updateVehicle(
                    values.vehicle.vin, 
                    values.newMake.value, 
                    values.newModel.value,
                    values.newYear);
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
                            <Form.Control plaintext readOnly defaultValue={values.vehicle.vin} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="newMake">
                        <Form.Label column sm={1}>Make:</Form.Label>
                        <Col sm={8}>
                            <Dropdown
                                id="newMake"
                                name="newMake"
                                options={context.state.makeOptions}
                                value={values.newMake}
                                onChange={(field, value) => {
                                    const newMakeValue = value.value;
                                    const shouldResetDependentSelect = newMakeValue !== context.state.prevMake;
                                    context.setState({ prevMake: newMakeValue }, () => {
                                        setFieldValue(field, value);
                                        context.updateModelOptions(value.value);
                                        if (shouldResetDependentSelect) {
                                            setFieldValue("newModel", emptyOption);
                                        }
                                    });
                                }}
                                onBlur={setFieldTouched}
                                error={errors.newMake}
                                touched={touched.newMake}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="newModel">
                        <Form.Label column sm={1}>Model:</Form.Label>
                        <Col sm={8}>
                            <Dropdown
                                id="newModel"
                                name="newModel"
                                isDisabled={!values.newMake}
                                options={
                                    values.newMake ? context.state.modelOptions : []
                                }
                                value={values.newModel}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                error={errors.newModel}
                                touched={touched.newModel}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="newYear">
                        <Form.Label column sm={1}>Year:</Form.Label>
                        <Col sm={8}>
                            <Form.Control 
                                type="text"
                                name="newYear" 
                                defaultValue={values.vehicle.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.newYear && !!errors.newYear} />
                            <Form.Control.Feedback type="invalid">{errors.newYear}</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Button type="submit" disabled={isSubmitting}>Save</Button>
                </Form>
                )}
            </Formik>
        </Container>
    )
}

class EditVehicleForm extends Component {
    constructor(props) {
        super(props)
        const currentVehicle = this.props.vehicles.find(vehicle => vehicle.vin === this.props.match.params["vin"]);
        this.state = {
            vehicle: currentVehicle,
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

export default EditVehicleForm