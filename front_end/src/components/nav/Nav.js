import React from 'react';
import {MainNav, LeftNav, RightNav} from './nav_css.js'
import { withRouter } from "react-router-dom";
import firebase from 'firebase';
import {connect} from 'react-redux';

class Nav extends React.Component {
	constructor(){
		super();
		this.state = {};
	}

	componentDidMount(){}

	//the styling change from add Link to was giving me a headache so I did this

	events = () => {
		this.props.history.push("/events")
	}

	profile = () => {
		this.props.history.push("/user-profile")
	}

	users = () => {
		this.props.history.push("/users")
	}

	create = () => {
		this.props.history.push("/create-event")
	}

	started = () => {
		this.props.history.push("/get-started")
	}

	logOut = (event) => {
		event.preventDefault()
		firebase.auth().signOut();
		this.props.history.push("/")
	}

	render() {
		return (
			<MainNav>
				<LeftNav id="noHover">
					<p onClick={this.logOut}>Sign Out</p>
				</LeftNav>
				<RightNav>
					<p onClick={this.started}>Home</p>
					<p onClick={this.events}>Events</p>
					<p onClick={this.profile}>Profile</p>
					<p onClick={this.users}>Users</p>
					<p onClick={this.create}>Make Event</p>
				</RightNav>
			</MainNav>
		)
	}
}


const mapStateToProps = (state) => {
	return {auth: state.firebase.auth}
}

export default withRouter(connect(mapStateToProps, null)(Nav));