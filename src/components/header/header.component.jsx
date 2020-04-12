import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

import {auth} from '../../firebase/firebase.utils';

import {ReactComponent as Logo} from '../../assets/crown.svg'

import './header.styles.scss';

const Header = ({currentUser}) => { // It's getting currentUser prop from rootReducer
	return (
		<div className='header'>
			<Link className='logo-container' to="/"> 
				<Logo className='logo' />
			</Link>
			<div className='options'>
				<Link className='option' to='/shop'>
					SHOP
				</Link>
				<Link className='option' to='/shop'>
					CONTACT
				</Link>
				{
					currentUser ? 
					<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> 
					: 
					<Link className='option' to='/signin'>SIGN IN</Link>
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({ // state => rootReducer
	currentUser: state.user.currentUser
})


// We asked currentUser props from rootReducer by connect with mapStateToProps
export default connect(mapStateToProps)(Header); 

