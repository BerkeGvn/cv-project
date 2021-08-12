/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import { OutsideClick, pressEnter } from '../helper';

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSkillValue: '',
      newSkill: false,
      skills: [{ value: 'Lorem ipsum', edit: false }, { value: 'Dolor sit', edit: false }, { value: 'consectetur adipiscing', edit: false }, { value: 'eiusmod', edit: false }],
    };
    this.clickOutside = this.clickOutside.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItemValue = this.editItemValue.bind(this);
    this.addNewSkill = this.addNewSkill.bind(this);
    this.saveNewSkillValue = this.saveNewSkillValue.bind(this);
    this.addNewSkillValue = this.addNewSkillValue.bind(this);
  }

  clickOutside() {
    const { skills } = this.state;
    const editList = skills.map((val) => ({ ...val }));

    editList.forEach((val) => {
      if (val.edit === true) {
        val.edit = false;
      }
    });

    this.setState({
      skills: editList,
      newSkillValue: '',
      newSkill: false,
    });
  }

  editItem(i) {
    const { skills, newSkill } = this.state;
    if (newSkill) {
      return;
    }
    const editList = skills.map((val) => ({ ...val }));
    editList.forEach((val) => {
      if (val.edit === true) {
        val.edit = false;
      }
    });
    editList[i].edit = true;

    this.setState({ skills: editList });
  }

  editItemValue(e, i) {
    const newValue = e.target.value;
    const { skills } = this.state;
    const editList = skills.map((val) => ({ ...val }));
    editList[i].value = newValue;

    this.setState({ skills: editList });
  }

  deleteItem(i) {
    const { skills } = this.state;
    const editList = skills.map((val) => ({ ...val }));
    editList.splice(i, 1);
    this.setState((prevState) => ({
      skills: prevState.skills,

    }), () => this.setState({
      skills: editList,
    }));
  }

  addNewSkill() {
    const { skills } = this.state;
    const alreadyOnEdit = skills.some(((val) => val.edit === true));
    if (alreadyOnEdit) {
      return;
    }
    this.setState((prevState) => ({ newSkill: !prevState.newSkill }));
  }

  saveNewSkillValue(e) {
    const newValue = e.target.value;
    this.setState({ newSkillValue: newValue });
  }

  addNewSkillValue() {
    const newSkill = {};
    const { skills, newSkillValue } = this.state;
    if (!newSkillValue) {
      return;
    }
    newSkill.value = newSkillValue;
    newSkill.edit = false;

    let editList = skills.map((val) => ({ ...val }));
    editList = editList.concat(newSkill);
    this.setState({
      skills: editList,
      newSkillValue: '',
      newSkill: false,

    });
  }

  render() {
    const { skills, newSkill } = this.state;
    return (
      <div className="experience-section-div skills-section">
        <h3 className="experience-section-header">+ Skills</h3>
        <SkillList
          skills={skills}
          editItem={this.editItem}
          clickOutside={this.clickOutside}
          editItemValue={this.editItemValue}
          deleteItem={this.deleteItem}
          newSkill={newSkill}
          addNewSkill={this.addNewSkill}
          addNewSkillValue={this.addNewSkillValue}
          saveNewSkillValue={this.saveNewSkillValue}

        />

      </div>
    );
  }
}

const SkillList = ({
  skills, editItem, clickOutside, editItemValue,
  deleteItem, newSkill, addNewSkillValue, saveNewSkillValue, addNewSkill,
}) => {
  const ref = useRef();
  OutsideClick(ref, () => {
    clickOutside();
  });

  pressEnter(() => {
    addNewSkillValue();
    clickOutside();
  });

  return (
    <div ref={ref}>
      <ul className="skills-section-ul">
        {skills.map((val, i) => (
          <li className="skills-section-list" onClick={() => editItem(i)} key={i}>
            {val.edit
              ? (
                <label htmlFor="newText">
                  {' '}
                  <input
                    className="skills-section-input"
                    value={val.value}
                    onChange={(e) => editItemValue(e, i)}
                  />
                  <button onClick={() => deleteItem(i)} type="button" className="skills-section-delete-btn button">Delete</button>
                </label>

              )
              : (
                <p className="skills-section-text">
                  -
                  {' '}
                  {val.value}
                </p>
              ) }
          </li>
        ))}
        {newSkill ? (
          <label htmlFor="newitem">
            <input onChange={(e) => saveNewSkillValue(e)} className="skills-section-input" />
            <button onClick={addNewSkillValue} type="button" className="skills-section-delete-btn button">Add</button>
          </label>
        ) : null}

      </ul>
      <button onClick={addNewSkill} type="button" className="skills-section-add-btn button">{newSkill ? 'Cancel' : 'Add'}</button>
    </div>

  );
};
SkillList.propTypes = {
  skills: PropTypes.array.isRequired,
  editItem: PropTypes.func.isRequired,
  clickOutside: PropTypes.func.isRequired,
  editItemValue: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  newSkill: PropTypes.bool.isRequired,
  addNewSkillValue: PropTypes.func.isRequired,
  addNewSkill: PropTypes.func.isRequired,
  saveNewSkillValue: PropTypes.func.isRequired,
};

export default Skills;
