import React from 'react'
import {
    Link, Redirect,
    } from "react-router-dom"
import {sign_up as ask_sign_up} from './Requestor'
import cookie from 'react-cookies'
import './styles/styles.scss'


export default class Registration extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            is_registered: false
        }

        this.sign_up = this.sign_up.bind(this)
    }

    render(){
        const is_registered = this.state.is_registered || cookie.load('user') !== undefined

        if(is_registered){
            return this.redirect_to_authorization()
        }

        return this.display_registration()
    }

    redirect_to_authorization(){
        return(
            <Redirect to='/authorization' />
        );
    }

    sign_up(){
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const password_confirmation = document.getElementById('password_confirmation').value

        if(login.length === 0 || password.length === 0 || password_confirmation.length === 0){
            alert('Error: Fill in all the fields!')
            return
        }

        if(login.indexOf(' ') !== -1 || login.indexOf('$') !== -1 || login.indexOf('!') !== -1 ||
        login.indexOf('/') !== -1 || login.indexOf('\\') !== -1 || login.indexOf('%') !== -1 ||
        login.indexOf('^') !== -1 || login.indexOf('&') !== -1 || login.indexOf('(') !== -1 ||
        login.indexOf('~') !== -1 || login.indexOf(')') !== -1){
            alert('Error: You are using illegal symbols!')
            return
        }

        if(password !== password_confirmation){
            alert('Error: Passwords must match!')
            return
        }

        ask_sign_up(login, password)
        .then(data => {
            this.setState({is_registered: true})
            alert("You successfully signed up!")
        }).catch(error => {
            alert(error)
        });
    }

    display_registration(){
        return(
            <div className='mb-3 authorizationWrap'>
                <div className='bg-primary text-white card-header authorizationHead'>
                    Registration
                </div>
                <div className='authorizationBody'>
                    <div className='authorizationForm'>
                        <input className='form-control userInput' id="login" placeholder="Login"></input>
                        <input className='form-control userInput' type="password" id="password" placeholder="Password"></input>
                        <input className='form-control userInput' type="password" id="password_confirmation" placeholder="Confirm password"></input>
                        <button className='btn btn-primary formButton' onClick={this.sign_up}>Sign Up</button>
                    </div>
                    <div className='registrationLink'>
                        <Link to='/authorization'>Sign In</Link>
                    </div>
                </div>
            </div>
        );
    }
}