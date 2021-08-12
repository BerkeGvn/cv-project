import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GeneralSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSection: {
        value: 'Name',
        edit: false,

      },
      surnameSection: {
        value: 'Surname',
        edit: false,
      },
      jobSection: {
        value: 'Job Title',
        edit: false,
      },
    };
    this.makeEdit = this.makeEdit.bind(this);
    this.newValue = this.newValue.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    document.addEventListener('keydown', this.handleEnter);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
    document.addEventListener('keydown', this.handleEnter);
  }

  handleEnter(event) {
    if ((event.code === 'Enter' || event.code === 'NumpadEnter')) {
      const { nameSection } = this.state;
      nameSection.edit = false;
      if (!nameSection.value) {
        nameSection.value = 'Name';
      }
      const { surnameSection } = this.state;
      if (!surnameSection.value) {
        surnameSection.value = 'Surname';
      }
      surnameSection.edit = false;
      const { jobSection } = this.state;
      if (!jobSection.value) {
        jobSection.value = 'Surname';
      }
      jobSection.edit = false;
      this.setState({
        nameSection,
        surnameSection,
        jobSection,
      });
    }
  }

  handleClickOutside(event) {
    const domNode = this.myRef.current;
    const { nameSection } = this.state;
    nameSection.edit = false;
    if (!nameSection.value) {
      nameSection.value = 'Name';
    }
    const { surnameSection } = this.state;
    if (!surnameSection.value) {
      surnameSection.value = 'Surname';
    }
    surnameSection.edit = false;
    const { jobSection } = this.state;
    if (!jobSection.value) {
      jobSection.value = 'Surname';
    }
    jobSection.edit = false;

    if ((!domNode || !domNode.contains(event.target))) {
      this.setState({
        nameSection,
        surnameSection,
        jobSection,
      });
    }
  }

  makeEdit(section) {
    const newSection = section;
    newSection.edit = true;
    this.setState({
      [section]: newSection,
    });
  }

  newValue(e, section) {
    const newValue = e.target.value;
    const newSection = section;
    newSection.value = newValue;
    this.setState({
      [section]: newSection,
    });
  }

  render() {
    const { nameSection } = this.state;
    const { surnameSection } = this.state;
    const { jobSection } = this.state;
    return (
      <div className="titles" ref={this.myRef}>

        <Name
          data={nameSection}
          makeEdit={this.makeEdit}
          newValue={this.newValue}
        />

        <Surname
          data={surnameSection}
          makeEdit={this.makeEdit}
          newValue={this.newValue}
        />

        <Job
          data={jobSection}
          makeEdit={this.makeEdit}
          newValue={this.newValue}
        />
      </div>

    );
  }
}

const Name = ({ data, makeEdit, newValue }) => (
  <div role="menuitem" tabIndex="0" onClick={() => makeEdit(data)}>
    {data.edit ? (
      <input
        className="titles-header-input"
        value={data.value}
        onChange={(e) => {
          newValue(e, data);
        }}
        type="text"
      />
    )
      : <h1 className="titles-header titles-header-name ">{data.value}</h1>}
  </div>
);

Name.propTypes = {
  data: PropTypes.object.isRequired,
  makeEdit: PropTypes.func.isRequired,
  newValue: PropTypes.func.isRequired,
};

const Surname = ({ data, makeEdit, newValue }) => (
  <div role="menuitem" tabIndex="0" onClick={() => makeEdit(data)}>
    {data.edit ? (
      <input
        id
        className="titles-header-input"
        value={data.value}
        onChange={(e) => {
          const event = e;
          return newValue(event, data);
        }}
        type="text"
      />
    )
      : <h1 className="titles-header">{data.value}</h1>}
  </div>
);

Surname.propTypes = {
  data: PropTypes.object.isRequired,
  makeEdit: PropTypes.func.isRequired,
  newValue: PropTypes.func.isRequired,
};

const Job = ({ data, makeEdit, newValue }) => (
  <div role="menuitem" tabIndex="0" onClick={() => makeEdit(data)}>
    {data.edit ? (
      <input
        id="job"
        className="titles-h2-input"
        value={data.value}
        onChange={(e) => {
          const event = e;
          return newValue(event, data);
        }}
        type="text"
      />
    )
      : <h2 className="titles-h2">{data.value}</h2>}
  </div>
);

Job.propTypes = {
  data: PropTypes.object.isRequired,
  makeEdit: PropTypes.func.isRequired,
  newValue: PropTypes.func.isRequired,
};

export default GeneralSection;
