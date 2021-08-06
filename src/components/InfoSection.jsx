/* eslint-disable react/sort-comp */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import { OutsideClick, pressEnter } from '../helper';

class InfoSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus, mi et tempor varius, neque mi accumsan augue, mollis scelerisque turpis augue vel nulla. Nullam sit amet vulputate arcu. Donec congue orci non enim finibus, nec lacinia lacus porta. In varius leo vulputate, hendrerit dui ac, pellentesque turpis.',
        edit: false,
      },
      language: {
        newItem: false,
        details: {
          value: '',
          edit: false,
        },
        itemList: [{ value: 'English', edit: false }, { value: 'Turkish', edit: false }, { value: 'Japanese', edit: false }],
      },
      interest: {
        newItem: false,
        details: {
          value: '',
          edit: false,
        },
        itemList: [{ value: 'Cycling', edit: false }, { value: 'Reading', edit: false }, { value: 'Travel', edit: false }],
      },

    };
    this.clickOutside = this.clickOutside.bind(this);
    this.submitSummary = this.submitSummary.bind(this);
    this.changeSummary = this.changeSummary.bind(this);
    this.makeSummaryEditable = this.makeSummaryEditable.bind(this);
    this.editListItem = this.editListItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.returnListValue = this.returnListValue.bind(this);
    this.editItemValue = this.editItemValue.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.getNewItem = this.getNewItem.bind(this);
  }

  clickOutside(section) {
    const newSection = section;
    newSection.edit = false;
    this.setState({
      [section]: newSection,
    });
  }

  makeSummaryEditable() {
    const { summary } = this.state;
    summary.edit = true;
    this.setState({ summary });
  }

  changeSummary(e) {
    const newValue = e.target.value;
    const { summary } = this.state;
    summary.text = newValue;
    this.setState({ summary });
  }

  submitSummary(e) {
    e.preventDefault();
    const { summary } = this.state;
    summary.edit = false;
    this.setState({ summary });
  }

  addNewItem(section) {
    const newSection = section;
    const { newItem, details, itemList } = newSection;
    if (newItem === false) {
      newSection.newItem = true;
      this.setState({
        [section]: newSection,
      });
    } else {
      if (!details.value) {
        newSection.newItem = false;
        this.setState({
          [section]: newSection,
        });
        return;
      }

      newSection.itemList = itemList.map((i) => ({ ...i }));
      newSection.itemList = newSection.itemList.concat(details);
      newSection.details = { ...section.details };
      newSection.newItem = false;
      newSection.details.value = '';

      this.setState({
        [section]: newSection,
      });
    }
  }

  getNewItem(e, section) {
    const newValue = e.target.value;
    const newSection = section;
    newSection.details.value = newValue;
    newSection.details.edit = false;

    this.setState({
      [section]: newSection,
    });
  }

  editItemValue(e, id, section) {
    const newValue = e.target.value;
    const newSection = section;
    const { itemList } = newSection;

    newSection.itemList = itemList.map((i) => ({ ...i }));

    newSection.itemList[id].value = newValue;
    this.setState((prevState) => ({
      [section]: prevState[section],

    }), () => this.setState({
      [section]: newSection,
    }));
  }

  deleteListItem(id, section) {
    const newSection = section;
    const { itemList } = newSection;

    newSection.itemList = itemList.map((i) => ({ ...i }));
    newSection.itemList.splice(id, 1);

    this.setState((prevState) => ({
      [section]: prevState[section],

    }), () => this.setState({
      [section]: newSection,
    }));
  }

  editListItem(id, section) {
    const newSection = section;
    const { itemList, newItem } = newSection;
    if (newItem) {
      return;
    }

    newSection.itemList = itemList.map((i) => ({ ...i }));

    newSection.itemList.forEach((val) => {
      if (val.edit === true) {
        val.edit = false;
      }
    });
    if (newSection.itemList[id]) {
      newSection.itemList[id].edit = true;
    }

    this.setState({
      [section]: newSection,
    });
  }

  /// //////////////////////////////////
  /*   submitItem(id, section) {
    const newSection = section;
    const { itemList } = newSection;

    newSection.itemList = itemList.map((i) => ({ ...i }));
    newSection.itemList[id].edit = false;

    this.setState((prevState) => ({
      [section]: prevState[section],

    }), () => this.setState({
      [section]: newSection,
    }));
    console.log(newSection);
  }
 */
  /// ///////////////////////////////

  returnListValue(section) {
    const newSection = section;
    const { itemList } = newSection;
    newSection.itemList = itemList.map((i) => ({ ...i }));
    newSection.itemList.forEach((val) => {
      if (val.edit === true) {
        val.edit = false;
      }
    });
    this.setState({
      [section]: newSection,
    });
  }

  render() {
    const { summary, language, interest } = this.state;
    const { text, edit } = summary;
    return (
      <div>
        <div className="info-section-element">
          <h3 className="info-section-element-header">Summary</h3>
          {edit ? (
            <Summary
              clickOutside={this.clickOutside}
              summary={summary}
              newText={this.changeSummary}
              submit={this.submitSummary}
            />
          )
            : (<p onClick={this.makeSummaryEditable}>{text}</p>)}
        </div>

        <div className="info-section-element info-section-language-section">
          <h3 className="info-section-element-header">Languages</h3>
          <ListItems
            returnValue={this.returnListValue}
            infoList={language}
            editItem={this.editListItem}
            deleteItem={this.deleteListItem}
            editItemValue={this.editItemValue}
            submitItem={this.submitItem}
          />
          <NewItems infoList={language} addNewItem={this.addNewItem} getNewItem={this.getNewItem} />
        </div>

        <div className="info-section-element">
          <h3 className="info-section-element-header">Interests</h3>
          <ListItems
            returnValue={this.returnListValue}
            infoList={interest}
            editItem={this.editListItem}
            deleteItem={this.deleteListItem}
            editItemValue={this.editItemValue}
            submitItem={this.submitItem}
          />
          <NewItems infoList={interest} addNewItem={this.addNewItem} getNewItem={this.getNewItem} />
        </div>

      </div>
    );
  }
}

const NewItems = ({ infoList, addNewItem, getNewItem }) => (
  <div>
    {infoList.newItem ? <input onChange={(e) => getNewItem(e, infoList)} className="info-section-list-input" type="text" /> : null}
    <button onClick={() => addNewItem(infoList)} type="button" className="button info-section-btn">Add</button>
  </div>
);
NewItems.propTypes = {
  infoList: PropTypes.object.isRequired,
  addNewItem: PropTypes.func.isRequired,
  getNewItem: PropTypes.func.isRequired,
};

const Summary = ({
  summary, newText, clickOutside, submit,
}) => {
  const ref = useRef();

  OutsideClick(ref, () => {
    clickOutside(summary);
  });
  return (
    <form className="info-section-summary-form" ref={ref} onSubmit={submit} action="">
      <textarea className="info-section-summary-form-textarea" onChange={newText} name="" id="123" cols="20" rows="10" />
      <button className="info-section-summary-form-btn button" type="submit">Submit</button>
    </form>

  );
};
Summary.propTypes = {
  summary: PropTypes.object.isRequired,
  newText: PropTypes.func.isRequired,
  clickOutside: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

const ListItems = ({
  infoList, editItem, deleteItem, returnValue, editItemValue, submitItem,
}) => {
  const ref = useRef();

  OutsideClick(ref, () => {
    returnValue(infoList);
  });
  pressEnter(() => {
    returnValue(infoList);
  });
  return (
    <ul ref={ref}>
      {
    infoList.itemList.map((val, i) => (
      <li className="info-section-list" onClick={() => { editItem(i, infoList); }} key={i}>
        {
        val.edit ? (
          <TextInput
            infoList={infoList}
            deleteItem={deleteItem}
            id={i}
            returnValue={returnValue}
            editItemValue={editItemValue}
            submitItem={submitItem}
          />
        )
          : (
            <p className="info-section-list-text" id={i}>
              -
              {' '}
              {val.value}
            </p>
          )
        }
      </li>
    ))
    }
    </ul>
  );
};
ListItems.propTypes = {
  infoList: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
  returnValue: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItemValue: PropTypes.func.isRequired,
  submitItem: PropTypes.func.isRequired,
};

const TextInput = ({
  id, deleteItem, infoList, editItemValue,
}) => (
  <label htmlFor=" ">
    <input onChange={(e) => editItemValue(e, id, infoList)} value={infoList.itemList[id].value} className="info-section-list-input" type="text" />
    <div className="info-section-list-buttons">
      {' '}
      <button onClick={() => deleteItem(id, infoList)} className="button info-section-list-buttons-btn" type="submit">Delete</button>
    </div>

  </label>
);
TextInput.propTypes = {
  id: PropTypes.number.isRequired,
  infoList: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItemValue: PropTypes.func.isRequired,
};
export default InfoSection;
