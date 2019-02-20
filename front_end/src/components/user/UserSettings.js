import React from 'react';
import Nav from '../nav/Nav.js'
import Select from 'react-select';
import './settings.css'
import {ProfileForm, ContainForm, Reset, Switch, SwitchTab, FlexDiv, CenterDiv, Submit} from './user_settings_css.js'
import axios from 'axios';
import { withAlert } from 'react-alert'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import Billing from '../billing/Billing.js'

const options = [
  { value: 'phone', label: 'phone' },
  { value: 'email', label: 'email' },
];

const options1 = [
  {value: 'soft', label: 'soft'},
  {value: 'hard', label: 'hard'}
]

const options2 = [
  {value: 'mild', 'label': 'mild'},
  {value: 'medium', 'label': 'medium'},
  {value: 'spicy', 'label': 'spicy'},
  {value: 'HOT!', 'label': 'Hot!'}
]

const options3 = [
  {value: 'street', 'label': 'street'},
  {value: 'gourmet', 'label': 'gourmet'}
]

class UserSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      phone: '',
      bymail: true,
      byphone: false,
      selectedOption: '',
      selectedOption1: '',
      selectedOption2: '',
      selectedOption3: '',
      profile: true,
      selected: ['', 'active'],
      usersName: '',
      value: ''
    };
  }

  componentDidMount(){
    let id = localStorage.getItem("user_id")
    axios.get(`https://production-taco.herokuapp.com/users/${id}/info`)
    .then(response => {
      //console.log(response)
      this.setState({
        usersName: response.data.name
      })
    })
  }

  // extra in case you need to reference

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  handleSelect1 = (selectedOption1) => {
    this.setState({ selectedOption1 });
    console.log(`Option selected:`, selectedOption1);
  }

  handleSelect2 = (selectedOption2) => {
    this.setState({ selectedOption2 });
    console.log(`Option selected:`, selectedOption2);
  }

  handleSelect3 = (selectedOption3) => {
    this.setState({ selectedOption3 });
    console.log(`Option selected:`, selectedOption3);
  }

  switchToBilling = () => {
    this.setState({
      profile: false,
      selected: ['active', '']
    })
  }

  switchToProfile = () => {
    this.setState({
      profile: true,
      selected: ['', 'active']
    })
  }

  submitEdit = (event) => {
    event.preventDefault()
    let ar = []

    for (let i = 0; i < this.state.selectedOption.length; i++){
      ar.push(this.state.selectedOption[i].value)
    }

    if (this.state.name === ''){
      this.setState({
        name: this.state.usersName
      })
    }

    let edited_user = {
      name: this.state.name,
      phone: this.state.phone,
      reminder: ar,
      hard_or_soft: this.state.selectedOption1.value,
      heat_pref: this.state.selectedOption2.value,
      street_gourmet: this.state.selectedOption3.value
    }

    if (isValidPhoneNumber(this.state.phone) === false && this.state.phone.length > 0){
      this.props.alert.show('not valid phone number')
      this.setState({
        phone: '',
        name: ''
      })
      return
    } 
  }

  render() {
    return (
      <div>
        <Nav/>
        <ContainForm>
          <h1>{this.state.usersName}</h1>
          <Switch>
            <div>
              <SwitchTab onClick={this.switchToBilling} className={this.state.selected[0]}>Billing</SwitchTab>
              <SwitchTab onClick={this.switchToProfile} className={this.state.selected[1]}>Profile</SwitchTab>
            </div>
          </Switch>
          {this.state.profile ? 
          (
            <div>
              <ProfileForm onSubmit={this.submitEdit}>
                <Reset>Reset Pass</Reset>
                <h2>Edit Profile</h2>
                <input
                  type="text"
                  placeholder='Edit Name'
                  onChange={this.handleChange}
                  name="name"
                  value={this.state.name}
                />
                <PhoneInput
                  country="US"
                  placeholder="Enter phone number"
                  value={ this.state.phone }
                  onChange={ phone => this.setState({ phone }) }
                  className="phone-input" 
                />
              </ProfileForm>
              <h2 className="prefs">Preferances</h2>
              <FlexDiv>
                <div>
                  <h3>Reminder Method</h3>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleSelect}
                    options={options}
                    isSearchable={true}
                    isMulti={true}
                    className="select"
                  />
                </div>
                <div>
                  <h3>Shell Type</h3>
                  <Select
                    value={this.state.selectedOption1}
                    onChange={this.handleSelect1}
                    options={options1}
                    className="select"
                  />
                </div>
              </FlexDiv>
              <FlexDiv>
                <div>
                  <h3>Spiciness</h3>
                  <Select
                    value={this.state.selectedOption2}
                    onChange={this.handleSelect2}
                    options={options2}
                    className="select"
                  />
                </div>
                <div>
                  <h3>Restaurant</h3>
                  <Select
                    value={this.state.selectedOption3}
                    onChange={this.handleSelect3}
                    options={options3}
                    className="select"
                  />
                </div>
              </FlexDiv>
            <Submit onClick={this.submitEdit}>SUBMIT</Submit>
          </div>
          ) 
            : 
            <Billing/>
          }

        </ContainForm>
      </div>
    )
  }
}

export default withAlert()(UserSettings);