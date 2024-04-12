import { useRef } from 'react';
import formCheck from './formCheck';
import './App.scss';

function App() {
  const formRef = useRef(null);
  const formData = {
    realname: '',
    age: null,
    gender: 'male',
    occupation: '',
    hobbies: [],
    intro: '',
  };
  const validators = {
    realname: (value) => ({
      reg: value.length >= 2 && value.length <= 10,
      msg: 'Realname must 2-10',
    }),
    age: (value) => ({
      reg: !isNaN(value) && value && value <= 120,
      msg: 'Age type Number and max 120',
    }),
    gender: null,
    hobbies: (value) => ({
      reg: value.length > 0,
      msg: 'Hobbies: min 1',
    }),

    occupation: (value) => ({
      reg: value.length > 0,
      msg: 'Occupation: min 1',
    }),

    intro: (value) => ({
      reg: value.length > 10,
      msg: 'Intro: min 10',
    }),
  };

  const { realname, age, occupation, intro } = formCheck.create(
    formRef,
    '.user-form',
    {
      formData,
      validators,
      pass(key, value) {
        console.log('pass', key, value);

        console.log(this.formRef.current.querySelector(`.${key}`));

        this.formRef.current.querySelectorAll(`.${key}`)[0].innerHTML = '';
        this.formRef.current.querySelector(
          `.${key}`
        ).className = `${key} success`;
      },
      noPass(key, value, msg) {
        console.log('nopass', key, value, msg);
        this.formRef.current.querySelector(
          `.${key}`
        ).className = `${key} error`;
        this.formRef.current.querySelectorAll(`.${key}`)[0].innerHTML = msg;
      },
      handleSubmit(formData) {
        alert(JSON.stringify(formData));
        console.log(formData);
      },
    }
  );
  return (
    <div className="container">
      <h2>React Form Check</h2>
      <div ref={formRef}>
        <p className="form-element">
          <label>真实姓名</label>
          <input
            type="text"
            name="realname"
            className="user-form"
            placeholder="Realname"
            defaultValue={realname.state}
          />
          <span className="realname error"></span>
        </p>

        <p className="form-element">
          <label>年龄</label>

          <input
            type="number"
            name="age"
            className="user-form"
            placeholder="Age"
            defaultValue={age.state}
          />
          <span className="age error"></span>
        </p>

        <p className="form-element">
          <label>性别</label>
          <input
            type="radio"
            name="gender"
            className="user-form"
            defaultValue="male"
            defaultChecked
          />
          male
          <input
            type="radio"
            name="gender"
            className="user-form"
            defaultValue="female"
            defaultChecked
          />
          female
          <span className="gender error"></span>
        </p>

        <p className="form-element">
          <label>职业</label>

          <select
            name="occupation"
            className="user-form"
            defaultValue={occupation.state}
          >
            <option value="">place choose</option>
            <option value="teacher">Teacher</option>
            <option value="police">Police</option>
          </select>
          <span className="occupation error"></span>
        </p>

        <p className="form-element">
          <label>个人爱好</label>
          <input
            type="checkbox"
            name="hobbies"
            className="user-form"
            defaultValue="travel"
          />
          Travel
          <input
            type="checkbox"
            name="hobbies"
            className="user-form"
            defaultValue="music"
          />
          Music
          <input
            type="checkbox"
            name="hobbies"
            className="user-form"
            defaultValue="football"
          />
          FootBall
          <span className="hobbies error"></span>
        </p>
        <p className="form-element">
          <label style={{ verticalAlign: '208px' }}>自我介绍</label>

          <textarea
            name="intro"
            defaultValue={intro.state}
            cols="30"
            rows="10"
            className="user-form"
            placeholder="Self Introduction"
          ></textarea>
          <span className="intro error"></span>
        </p>

        <p>
          <button className="user-form" type="submit">
            Submit
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
