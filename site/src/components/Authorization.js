import React from 'react'
import cookie from 'react-cookies'
import './styles/styles.scss'
import {
    Link,
    Redirect
  } from "react-router-dom"
import {sign_in as ask_sign_in} from './Requestor'


export default class Authorization extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            is_authenticated: false
        }

        this.sign_in = this.sign_in.bind(this)
    }

    render(){
        const is_logged_in = this.state.is_authenticated || cookie.load('user') !== undefined

        if(is_logged_in){
           return this.redirect_to_main()
        }

        return this.display_authorization()
    }

    sign_in(){
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value

        if(login.length === 0 || password.length === 0){
            alert('Fill in all the fields!')
            return
        }

        ask_sign_in(login, password)
        .then(token => {
            cookie.save('user', {token: token,
                                 username: login,
                                 password: password},
                                 { path: '/' })
            this.setState({is_authenticated: true})
        }).catch(error => {
            alert(error)
        });
    }

    redirect_to_main(){
        return(
            <Redirect to='/' />
        );
    }

    display_authorization(){
        return(
            <div className='mb-3 authorizationWrap'>
                <div className='bg-primary text-white card-header authorizationHead'>
                    Authorization
                </div>
                <div className='authorizationBody'>
                    <div className='authorizationForm'>
                        <input className='form-control userInput' id="login" placeholder="Login"></input>
                        <input className='form-control userInput' type="password" id="password" placeholder="Password"></input>
                        <button className='btn btn-primary formButton' onClick={this.sign_in}>Sign In</button>
                    </div>
                    <div className='registrationLink'>
                        <Link to='/registration'>Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}