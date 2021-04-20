import React, {useState} from 'react';
import ReadNotes from './ReadNotes';

export default function CreateNotes() {

  const valueDefault = {
    note:'',
  }
  const [value, setValue] = useState(valueDefault);

  const handleInputChange = (e) => {
    const{note, values} = e.target;
    setValue({...value, [note]:values})
  };

  const handleSubmitForm = (e) => {
    e.preventDefault(e);
    console.log(e)
  }

  return (
    <div className="notesContainer">
      <div clasName="createdForm">
        <form
        onChange={handleSubmitForm}
        className="setNoteForm">
          <div className="textareaSetNote">
            <textarea
            onChange={handleInputChange}
            className="inputNote"
            id="inputSetNote"
            placeholder="Keep an idea"
            type="text"
            />
            <div className="btnAddNote">
              <input
              onChange={handleInputChange}
              className="buttonAdd"
              type="submit"
              />
            </div>
          </div>
        </form>
      </div>
      <ReadNotes/>
    </div>
  )
}
