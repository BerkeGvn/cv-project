import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import { OutsideClick } from '../helper';

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addWork: false,
      experienceForm: {
        header: '',
        subHeader: '',
        startDate: '',
        endDate: '',
        details: '',
        edit: false,
      },
      workExperience: [{
        company: 'Gvnn Company',
        position: 'Frontend Developer',
        startDate: '2018',
        endDate: '2021',
        details: 'Lorem ipsum dolor sit amet, eu qui vidisse corrumpit mediocritatem, vim an volutpat convenire. Et doctus aliquando eos, verear nostrud.',
        edit: false,
      }],
      addEducation: false,
      education: [{
        company: 'Lorem ipsum University',
        position: 'Lorem ipsum  ',
        startDate: '2018',
        endDate: '2021',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus, mi et tempor varius',
        edit: false,
      }],
      newExperienceForm: {
        header: '',
        subHeader: '',
        startDate: '',
        endDate: '',
        details: '',
        edit: false,
      },
    };
    this.clickOutside = this.clickOutside.bind(this);
    this.displayNewForm = this.displayNewForm.bind(this);
    this.fillNewForm = this.fillNewForm.bind(this);
    this.submitNewExp = this.submitNewExp.bind(this);
    this.editExp = this.editExp.bind(this);
    this.rewriteExp = this.rewriteExp.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.deleteExp = this.deleteExp.bind(this);
  }

  clickOutside() {
    const { workExperience, education } = this.state;

    const editWork = workExperience.map((val) => ({ ...val }));
    const editEdu = education.map((val) => ({ ...val }));

    editWork.forEach((val) => (val.edit ? val.edit = false : null));
    editEdu.forEach((val) => (val.edit ? val.edit = false : null));

    this.setState({
      addWork: false,
      addEducation: false,
      workExperience: editWork,
      education: editEdu,
    });
  }

  displayNewForm(name) {
    const { workExperience, education } = this.state;
    const workAlreadyOnEdit = workExperience.some(((val) => val.edit === true));
    const eduAlreadyOnEdit = education.some(((val) => val.edit === true));
    if (workAlreadyOnEdit || eduAlreadyOnEdit) {
      return;
    }
    const state = name;

    this.setState((prevState) => ({
      [state]: !prevState[state],
    }));
  }

  fillNewForm(e, val) {
    const newVal = e.target.value;
    const { newExperienceForm } = this.state;
    const newForm = { ...newExperienceForm };

    newForm[val] = newVal;

    this.setState({
      newExperienceForm: newForm,
    });
  }

  submitNewExp(e, section, name) {
    e.preventDefault();
    const state = this.state[section];
    let newWorkArr = state.map((val) => ({ ...val }));

    const { newExperienceForm } = this.state;
    const newForm = { ...newExperienceForm };
    const newExp = {};
    newExp.company = newForm.header;
    newExp.position = newForm.subHeader;
    newExp.details = newForm.details;
    newExp.edit = false;
    if (newForm.startDate && newForm.endDate) {
      newExp.startDate = newForm.startDate.slice(0, 4);
      newExp.endDate = newForm.endDate.slice(0, 4);
    }

    newWorkArr = newWorkArr.concat(newExp);

    this.setState({
      [name]: false,
      newExperienceForm: {},
      [section]: newWorkArr,
    });
  }

  editExp(i, section, name) {
    const state = name;
    const { experienceForm, addWork, addEducation } = this.state;
    if (addWork || addEducation) {
      return;
    }
    const newForm = { ...experienceForm };
    const editExp = section.map((val) => ({ ...val }));

    editExp.forEach((val) => (val.edit ? val.edit = false : null));

    newForm.header = editExp[i].company;
    newForm.subHeader = editExp[i].position;
    newForm.date = editExp[i].date;
    newForm.details = editExp[i].details;
    this.clickOutside();

    editExp[i].edit = true;

    this.setState({
      experienceForm: newForm,
      [state]: editExp,
    });
  }

  rewriteExp(e, val) {
    const newVal = e.target.value;
    const { experienceForm } = this.state;
    const newForm = { ...experienceForm };

    newForm[val] = newVal;

    this.setState({
      experienceForm: newForm,
    });
  }

  submitForm(e, i, section, name) {
    e.preventDefault();
    const state = name;
    const { experienceForm } = this.state;
    const newForm = { ...experienceForm };

    const editExp = section.map((val) => ({ ...val }));
    editExp[i].company = newForm.header;
    editExp[i].position = newForm.subHeader;
    editExp[i].startDate = newForm.startDate.slice(0, 4);
    editExp[i].endDate = newForm.endDate.slice(0, 4);
    editExp[i].details = newForm.details;
    editExp[i].edit = false;

    this.setState({
      [state]: editExp,
    });
  }

  deleteExp(i, section, name) {
    const state = name;
    const editExp = section.map((val) => ({ ...val }));
    editExp.splice(i, 1);
    this.setState({
      [state]: editExp,
    });
  }

  render() {
    const {
      workExperience, experienceForm, addWork, education, addEducation,
    } = this.state;
    return (
      <div className="experience-section-divs">

        <ExperienceDiv
          workName="workExperience"
          workExperience={workExperience}
          educationName="education"
          education={education}
          experienceForm={experienceForm}
          clickOutside={this.clickOutside}
          rewriteExp={this.rewriteExp}
          edit={this.editExp}
          submitForm={this.submitForm}
          deleteExp={this.deleteExp}
          addWork={addWork}
          addEducation={addEducation}
          displayNewForm={this.displayNewForm}
          fillNewForm={this.fillNewForm}
          submitNewExp={this.submitNewExp}
        />
      </div>
    );
  }
}

const ExperienceDiv = ({
  workExperience, experienceForm, clickOutside, rewriteExp,
  edit, submitForm, workName, deleteExp, addWork, displayNewForm,
  fillNewForm, submitNewExp, educationName, education, addEducation,
}) => {
  const ref = useRef();
  OutsideClick(ref, () => {
    clickOutside();
  });

  return (
    <div ref={ref} className="experience-section-divs">
      <div className="experience-section-div experience-section-work">
        <h3 className="experience-section-header">+ Work Experience</h3>
        {workExperience.map((job, i) => (job.edit ? (
          <ExperienceForm
            key={i}
            expType={workExperience}
            id={i}
            name={workName}
            rewriteExp={rewriteExp}
            form={experienceForm}
            submitForm={submitForm}
            deleteExp={deleteExp}
          />
        )
          : (
            <ExperienceSummary
              key={i}
              expType={workExperience}
              id={i}
              exp={workExperience[i]}
              edit={edit}
              name={workName}
            />
          ))) }
        {addWork ? <NewExperienceForm fillNewForm={fillNewForm} submitNewExp={submitNewExp} section={workName} name="addWork" /> : null}
        <button
          onClick={() => displayNewForm('addWork')}
          className="experience-section-btn experience-section-work-btn button"
          type="button"
        >
          {addWork ? 'Delete' : 'Add'}
        </button>
      </div>

      <div className="experience-section-div experience-section-education" ref={ref}>
        <h3 className="experience-section-header">+ Education</h3>
        {education.map((job, i) => (job.edit ? (
          <ExperienceForm
            key={i}
            expType={education}
            id={i}
            name={educationName}
            rewriteExp={rewriteExp}
            form={experienceForm}
            submitForm={submitForm}
            deleteExp={deleteExp}
          />
        )
          : (
            <ExperienceSummary
              key={i}
              expType={education}
              id={i}
              exp={education[i]}
              edit={edit}
              name={educationName}
            />
          ))) }

        {addEducation ? <NewExperienceForm fillNewForm={fillNewForm} submitNewExp={submitNewExp} section={educationName} name="addEducation" /> : null}
        <button
          onClick={() => displayNewForm('addEducation')}
          className="experience-section-btn experience-section-education-btn button"
          type="button"
        >
          {addEducation ? 'Cancel' : 'Add'}
        </button>
      </div>
    </div>

  );
};
ExperienceDiv.propTypes = {
  workExperience: PropTypes.array.isRequired,
  experienceForm: PropTypes.object.isRequired,
  clickOutside: PropTypes.func.isRequired,
  rewriteExp: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  workName: PropTypes.string.isRequired,
  deleteExp: PropTypes.func.isRequired,
  addWork: PropTypes.bool.isRequired,
  displayNewForm: PropTypes.func.isRequired,
  fillNewForm: PropTypes.func.isRequired,
  submitNewExp: PropTypes.func.isRequired,
  educationName: PropTypes.string.isRequired,
  education: PropTypes.array.isRequired,
  addEducation: PropTypes.bool.isRequired,
};

const ExperienceSummary = ({
  expType, exp, id, edit, name,
}) => (
  <div id={id} onClick={() => edit(id, expType, name)} className="experience-summary">
    <div className="experience-summary-title">
      <p className="experience-summary-title-header">{exp.company}</p>
      <p className="experience-summary-date">
        {exp.startDate}
        {' '}
        -
        {' '}
        {exp.endDate}
      </p>
    </div>
    <p className="experience-summary-position">{exp.position}</p>
    <p className="experience-summary-details">{exp.details}</p>
  </div>

);
ExperienceSummary.propTypes = {
  expType: PropTypes.array.isRequired,
  exp: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,

};

const ExperienceForm = ({
  rewriteExp, id, form, submitForm, expType, deleteExp, name,
}) => (
  <form onSubmit={(e) => submitForm(e, id, expType, name)} className="experience-summary-form">

    <label className="experience-summary-form-label" htmlFor="name">
      <p className="experience-summary-form-text">{name === 'workExperience' ? 'Company Name' : 'School Name'}</p>
      <input onChange={(e) => rewriteExp(e, 'header')} value={form.header} className="experience-summary-form-header experience-summary-form-input" />
    </label>

    <label className="experience-summary-form-label" htmlFor="position">
      <p className="experience-summary-form-text">{name === 'workExperience' ? 'Position' : 'Degree'}</p>
      <input onChange={(e) => rewriteExp(e, 'subHeader')} value={form.subHeader} className="experience-summary-form-position experience-summary-form-input" />
    </label>

    <label className="experience-summary-form-label experience-summary-form-date" htmlFor="date">
      <p className="experience-summary-form-text">Dates</p>
      <input onChange={(e) => rewriteExp(e, 'startDate')} type="date" className="experience-summary-form-date experience-summary-form-date-dt" />
      <input onChange={(e) => rewriteExp(e, 'endDate')} type="date" className="experience-summary-form-date experience-summary-form-date-dt" />
    </label>

    <label className="experience-summary-form-label" htmlFor="Details">
      <p className="experience-summary-form-text">Details</p>
      <textarea onChange={(e) => rewriteExp(e, 'details')} value={form.details} className="experience-summary-form-details experience-summary-form-input" cols="30" rows="4" />
    </label>
    <div className="experience-summary-form-buttons">
      <button onClick={() => deleteExp(id, expType, name)} type="button" className="experience-summary-form-btn button">Delete</button>
      <button type="submit" className="experience-summary-form-btn button">Submit</button>
    </div>

  </form>
);
ExperienceForm.propTypes = {
  expType: PropTypes.array.isRequired,
  form: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  rewriteExp: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  deleteExp: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,

};
const NewExperienceForm = ({
  fillNewForm, submitNewExp, section, name,
}) => (
  <form onSubmit={(e) => submitNewExp(e, section, name)} className="experience-summary-form">

    <label className="experience-summary-form-label" htmlFor="company name">
      <p className="experience-summary-form-text">Company Name</p>
      <input required onChange={(e) => fillNewForm(e, 'header')} className="experience-summary-form-header experience-summary-form-input" />
    </label>

    <label className="experience-summary-form-label" htmlFor="Position">
      <p className="experience-summary-form-text">Position</p>
      <input onChange={(e) => fillNewForm(e, 'subHeader')} className="experience-summary-form-position experience-summary-form-input" />
    </label>

    <label className="experience-summary-form-label experience-summary-form-date" htmlFor="date">
      <p className="experience-summary-form-text">Dates</p>
      <input onChange={(e) => fillNewForm(e, 'startDate')} type="date" className="experience-summary-form-date experience-summary-form-date-dt" />
      <input onChange={(e) => fillNewForm(e, 'endDate')} type="date" className="experience-summary-form-date experience-summary-form-date-dt" />
    </label>

    <label className="experience-summary-form-label" htmlFor="Details">
      <p className="experience-summary-form-text">Details</p>
      <textarea onChange={(e) => fillNewForm(e, 'details')} className="experience-summary-form-details experience-summary-form-input" cols="30" rows="4" />
    </label>
    <div className="experience-summary-form-buttons">
      <button type="submit" className="experience-summary-form-btn button">Submit</button>
    </div>

  </form>
);
NewExperienceForm.propTypes = {

  fillNewForm: PropTypes.func.isRequired,
  submitNewExp: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,

};

export default Experience;
