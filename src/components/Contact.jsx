/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
import React, { Component, useRef } from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import LanguageIcon from '@material-ui/icons/Language';
import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';
import OutsideClick from '../helper';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        number: '000-000-00-00',
        email: 'berkegvn@gmail.com',
        site: 'www.github.com',
        adress: '865 Pheasant Court Superior, WI 54880',
      },
      edit: false,
    };
    this.revealForm = this.revealForm.bind(this);
    this.submitContact = this.submitContact.bind(this);
    this.getValue = this.getValue.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
  }

  getValue(e, value) {
    const newValue = e.target.value;
    const { info } = this.state;
    info[value] = newValue;
    this.setState({ info });
  }

  revealForm() {
    this.setState({ edit: true });
  }

  submitContact(e) {
    e.preventDefault();
    this.setState({ edit: false });
  }

  clickOutside() {
    this.setState({ edit: false });
  }

  render() {
    const { info } = this.state;
    const { edit } = this.state;
    return (
      <div>
        {edit ? (
          <ContactForm
            clickOutside={this.clickOutside}
            getValue={this.getValue}
            submitContact={this.submitContact}
          />
        )
          : <ContactInfo revealForm={this.revealForm} info={info} />}
      </div>
    );
  }
}

const ContactInfo = ({ info, revealForm }) => (
  <div className="contact-info" onClick={revealForm}>
    <div className="contact-info-el">
      <PhoneIcon className="icon" />
      <p className="contact-info-text">{info.number}</p>
    </div>
    <div className="contact-info-el">
      <MailIcon className="icon" />
      <p className="contact-info-text">{info.email}</p>
    </div>
    <div className="contact-info-el">
      <LanguageIcon className="icon" />
      <p className="contact-info-text">{info.site}</p>
    </div>
    <div className="contact-info-el">
      <HomeIcon className="icon" />
      <p className="contact-info-text">{info.adress}</p>
    </div>
  </div>
);

ContactInfo.propTypes = {
  info: PropTypes.object.isRequired,
  revealForm: PropTypes.func.isRequired,
};

const ContactForm = ({ getValue, submitContact, clickOutside }) => {
  const ref = useRef();

  OutsideClick(ref, () => {
    clickOutside();
  });
  return (
    <div className="contact-info">
      <form ref={ref} className="contact-info-form" onSubmit={submitContact} action="">
        <label className="contact-info-form-label" htmlFor="number">
          <p>Phone Number</p>
          <input onChange={(e) => getValue(e, 'number')} className="contact-info-form-input" type="text" />
        </label>

        <label className="contact-info-form-label" htmlFor="email">
          <p>Email</p>
          <input onChange={(e) => getValue(e, 'email')} className="contact-info-form-input" type="email" />
        </label>

        <label className="contact-info-form-label" htmlFor="website">
          <p>Website/Media</p>
          <input onChange={(e) => getValue(e, 'site')} className="contact-info-form-input" type="text" />
        </label>

        <label className="contact-info-form-label" htmlFor="adress">
          <p>Adress</p>
          <input onChange={(e) => getValue(e, 'adress')} className="contact-info-form-input" type="text" />
        </label>

        <button className="contact-info-form-button button" type="submit">
          {' '}
          Submit
          <ArrowForwardIcon className="icon" />
        </button>
      </form>
    </div>
  );
};
ContactForm.propTypes = {
  getValue: PropTypes.func.isRequired,
  submitContact: PropTypes.func.isRequired,
  clickOutside: PropTypes.func.isRequired,
};

export default Contact;
