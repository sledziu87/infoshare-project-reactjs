import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import FunctionList from './function_list';
import AboutUs from './about_us/about_us';
import LogScreen from './log_screen/log_screen';
import SignUpScreen from './log_screen/signup_screen';
import GetExchangeRate from './get_exchange_rate/getExchangeRate';
import ExchangeRateHistory from './exchange_rate_history/exchangeRateHistory'

import NavigationBar from './navbar';
import Teaser from './teaser/teaser';
import Converter from './currency_converter';

import UsersTab from './usersTab/usersTab.js';
import { Modal } from 'react-bootstrap';

class App extends Component {
    constructor() {
        super();

        this.state = {
            showModal: false,
            showRegistration: false
        };
    }

    componentDidMount() {

        const pressed = [];
        const secretCode = 'sudopig';
        window.addEventListener('keyup', (e) => {
            pressed.push(e.key);
            pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
            if (pressed.join('').includes(secretCode)) {
                this.setState({
                    showModal: true
                });
            }
        });
    }

    close = () => { this.setState({showModal: false});};

    onRegistration = () => {
        this.setState({ showRegistration: true });
    };

    onLogin = () => {
        this.setState({ showRegistration: false });
    };

    isUserLoggedIn = () => {
      return window.sessionStorage.getItem('applicationInfoshare') === 'true' ? true : false;
    };

    renderModal() {
        return (
            <div>
                <Modal className="modal-container" show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton >
                        <Modal.Title>Lista zarejestrowanych użytkowników</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UsersTab/>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }

    renderWhenImLoggedIn() {
        return (
            <div>
                <GetExchangeRate/>
                <Converter/>
                <ExchangeRateHistory/>
                {/*<input className="LogOutBtn" type="button" value="Wyloguj" onClick={this.setSessionStorage}/>*/}
                {/*<button onClick={this.setSessionStorage}>Wyloguj</button>*/}
            </div>
        );
    }

    renderWhenImNotLoggedIn() {
        return (
            <div>
                <NavigationBar/>
                <Teaser/>
                <FunctionList/>
                <AboutUs/>
                {this.state.showRegistration ? <SignUpScreen onClick={this.onLogin}/> : <LogScreen onClick={this.onRegistration}/>}
            </div>
        );
    }

    // Wylogowywanie
    setSessionStorage() {
        window.sessionStorage.setItem("applicationInfoshare", "false");
        window.location.href = '/';
    }

    render() {
        return (
            <div>
                <NavigationBar logout={this.setSessionStorage}/>
                {this.isUserLoggedIn() === true ? this.renderWhenImLoggedIn() : this.renderWhenImNotLoggedIn()}
                {this.renderModal()}
            </div>
        );
    }
}

export default App;