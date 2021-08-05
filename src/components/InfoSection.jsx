/* eslint-disable react/sort-comp */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import OutsideClick from '../helper';

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
    this.submitItem = this.submitItem.bind(this);
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

  addNewItem() {
    const { language } = this.state;
    const { newItem } = language;
    const { details } = language;
    const { itemList } = language;
    if (newItem === false) {
      this.setState((prevState) => ({
        language: {
          ...prevState.language,
          newItem: true,
        },
      }));
    } else {
      if (!details.value) {
        this.setState((prevState) => ({
          language: {
            ...prevState.language,
            newItem: false,
          },
        }));
        return;
      }

      let list = itemList.map((i) => ({ ...i }));
      list = list.concat(details);

      this.setState({
        language: {
          newItem: false,
          details: {
            value: '',
            edit: false,
          },
          itemList: list,
        },
      });
    }
  }

  getNewItem(e) {
    const newValue = e.target.value;

    this.setState((prevState) => ({
      language: {
        ...prevState.language,
        details: {
          value: newValue,
          edit: false,
        },
      },
    }));
  }

  editItemValue(e, id) {
    const newValue = e.target.value;
    const { language } = this.state;
    const { details } = language;
    const { itemList } = language;

    const list = itemList.map((i) => ({ ...i }));

    list[id].value = newValue;
    this.setState((prevState) => ({
      language: prevState.language,

    }), () => this.setState({
      language: {
        details,
        itemList: list,
      },
    }));
  }

  deleteListItem(id) {
    const { language } = this.state;
    const { details } = language;
    const { itemList } = language;
    const list = itemList.map((i) => ({ ...i }));
    list.splice(id, 1);

    this.setState((prevState) => ({
      language: prevState.language,

    }), () => this.setState({
      language: {
        details,
        itemList: list,
      },
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

    newSection.itemList[id].edit = true;
    console.log(section);
    this.setState({
      [section]: newSection,
    });
  }

  submitItem(id) {
    const { language } = this.state;
    const { details } = language;
    const { itemList } = language;
    const list = itemList.map((i) => ({ ...i }));
    list[id].edit = false;
    this.setState((prevState) => ({
      language: prevState.language,

    }), () => this.setState({
      language: {
        details,
        itemList: list,
      },
    }));
  }

  returnListValue() {
    const { language } = this.state;
    const { itemList } = language;

    const list = itemList.map((i) => ({ ...i }));

    list.forEach((val) => {
      if (val.edit === true) {
        val.edit = false;
      }
    });

    this.setState((prevState) => ({
      language: {
        ...prevState.language,
        itemList: list,
      },
    }));
  }

  render() {
    const { summary, language, interest } = this.state;
    const { text, edit } = summary;
    const { newItem, itemList } = language;
    /*     const InterestsItems = interest.itemList; */

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
            language={language}
            editItem={this.editListItem}
            deleteItem={this.deleteListItem}
            editItemValue={this.editItemValue}
            submitItem={this.submitItem}
          />
          {newItem ? <input onChange={(e) => this.getNewItem(e)} className="info-section-list-input" type="text" /> : null}
          <button onClick={this.addNewItem} type="button" className="button info-section-btn">Add</button>
        </div>

        <div className="info-section-element">
          <h3 className="info-section-element-header">Interests</h3>
          <InterestsList interests={interest} editItem={this.editListItem} />
        </div>

      </div>
    );
  }
}

const InterestsList = ({ interests, editItem }) => (
  <ul>
    {
    interests.itemList.map((val, i) => (
      <li className="info-section-list" onClick={() => { editItem(i, interests); }} key={i}>
        {
        val.edit ? <p>hekki</p> : (
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
  language, editItem, deleteItem, returnValue, editItemValue, submitItem,
}) => {
  const ref = useRef();

  OutsideClick(ref, () => {
    returnValue();
  });
  return (
    <ul ref={ref}>
      {
    language.itemList.map((val, i) => (
      <li className="info-section-list" onClick={() => { editItem(i, language); }} key={i}>
        {
        val.edit ? (
          <TextInput
            language={language}
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
  language: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
  returnValue: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItemValue: PropTypes.func.isRequired,
  submitItem: PropTypes.func.isRequired,
};

const TextInput = ({
  id, deleteItem, language, editItemValue, submitItem,
}) => (
  <label htmlFor=" ">
    <input onChange={(e) => editItemValue(e, id)} value={language.itemList[id].value} className="info-section-list-input" type="text" />
    <div className="info-section-list-buttons">
      {' '}
      <button onClick={() => deleteItem(id)} className="button info-section-list-buttons-btn" type="submit">Delete</button>
      <button onClick={() => submitItem(id)} className="button info-section-list-buttons-btn" type="submit">Edit</button>

    </div>

  </label>
);
TextInput.propTypes = {
  id: PropTypes.number.isRequired,
  language: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItemValue: PropTypes.func.isRequired,
  submitItem: PropTypes.func.isRequired,
};
export default InfoSection;
