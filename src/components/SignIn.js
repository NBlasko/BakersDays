import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Container, Alert} from 'reactstrap';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error:
            { message: '' }
        }
        this.signIn = this.signIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    signIn(e) {
        e.preventDefault();
        let { email, password } = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(error => { this.setState({ error }) });
    }


    handleChange(e) {

        this.setState({ [e.target.name]: e.target.value });

    }
        handleKeyPress(e) {
        if (e.key === 'Enter') {
            let { email, password } = this.state;
            firebaseApp.auth().signInWithEmailAndPassword(email, password)
                .catch(error => { this.setState({ error }) });
        }
    }
    render() {
        let errorMessage = (this.state.error.message !== '') ? <Alert color="warning">{this.state.error.message}</Alert> : null;
        return (
            <div>
                <Container>
                <Form>
                <h3 className = "text-primary"> Prijavi se </h3>
                <FormGroup> <Input type="email" placeholder="email" name="email" onChange={this.handleChange} onKeyPress={this.handleKeyPress} /> </FormGroup>
                <FormGroup> <Input type="password" placeholder="password" name="password" onChange={this.handleChange} onKeyPress={this.handleKeyPress} /> </FormGroup>
                <FormGroup> <Button color="primary" className="rigthAlign" type="button" onClick={this.signIn}> Sign In </Button> </FormGroup>
                <FormGroup> <Link to={'./signup'}> Registruj se </Link> </FormGroup>
                <FormGroup> {errorMessage} </FormGroup>
                </Form>
                </Container>
            </div>
        );
    }
}



export default SignIn;