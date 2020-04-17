import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

import auth from '../auth/auth'

class Navigation extends Component {

	render() {
        return (
			<nav className='Navigation'>
                <Link to='/'>
                    <h1>Trax</h1>
                </Link>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {this.getLoginSignUpLinks()}
                </ul>

                {this.getUserElement()}
            </nav>
		)
    }
    
    getUserElement = () => {  
        if (auth.isAuthenticated()) {
            return (
                <div className='user'>
                    <Link to='/profile'>
                        <strong>{auth.user.name}</strong>
                    </Link>
                    
                    <Button
                        text='Logout'
                        onClick={ 
                            () => {
                                auth.logout()
                                this.props.setLoggedIn(false)
                            }
                        }
                    />
                </div>
            )
        }

        return null
    }

    getLoginSignUpLinks = () => {
        if (!auth.isAuthenticated()) {
            return (
                <>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/signup'>Sign up</Link>
                    </li>
                </>
            )
        }

        return null
    }
}

export default Navigation;
