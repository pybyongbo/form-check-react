/* eslint-disable react-hooks/rules-of-hooks */
/* 
     realname
     const [realname,setRealname] = useState(formData.realname)

*/

import { useEffect, useState } from 'react';

const EVENT_MAP = {
  text: 'input',
  number: 'input',
  textarea: 'input',
  radio: 'click',
  checkbox: 'click',
  submit: 'click',
  'select-one': 'change',
};

export default class FormCheck {
  constructor(
    formRef,
    elClass,
    { formData, validators, pass, noPass, handleSubmit }
  ) {
    this.formRef = formRef;
    this.elClass = elClass;
    this.formData = formData;
    this.validators = validators;
    this.pass = pass;
    this.noPass = noPass;
    this.handleSubmit = handleSubmit;
    // 填写true or  false
    this.result = {};
    this.isDisabled = true;

    FormCheck.stateMap = FormCheck.createStateMap(this.formData);
    useEffect(() => {
      this.initResult();

      const submitBtn = this.formRef.current.querySelectorAll(
        'button[type="submit"]'
      )[0];

      submitBtn.setAttribute('disabled', true);

      this.bindEvent();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  initResult() {
    for (let key in this.formData) {
      if (this.validators[key]) {
        this.result[key] = false;
      }
    }
    console.log(this.result);
    return this.result;
  }

  setResult(key, completed) {
    this.result[key] = completed;
  }

  bindEvent() {
    const oFormElements = this.formRef.current.querySelectorAll(this.elClass);

    oFormElements.forEach((el) => {
      const { type } = el;
      el.addEventListener(EVENT_MAP[type], this.setValue.bind(this, el), false);
    });
  }

  async setValue(el) {
    const { type, name: key, value } = el;
    if (type === 'submit') {
      this.handleSubmitClick();
      return;
    }

    const { state, setState } = FormCheck.stateMap[key];
    let finalValue;
    await setState((val) => {
      if (type === 'checkbox') {
        finalValue = state.includes(value)
          ? val.filter((item) => item !== value)
          : [...val, value];
      } else {
        finalValue = value;
      }

      return finalValue;
    });
    this.validate(key, finalValue);
  }

  validate(key, value) {
    const keyValidator = this.validators[key];

    // 排除掉为空的情况
    if (keyValidator) {
      const { reg, msg } = keyValidator(value);
      // let enAble;
      if (!reg) {
        this.setResult(key, false);
        this.noPass(key, value, msg);
        console.log(this.result);
        this.checkSubmitBtn(this.result);
        return;
      }
      this.setResult(key, true);
      this.pass(key, value);
      this.checkSubmitBtn(this.result);

      // console.log('enAble', enAble);
    }
  }

  // 判断提交按钮是否可用
  checkSubmitBtn(result) {
    const submitBtn = this.formRef.current.querySelectorAll(
      'button[type="submit"]'
    )[0];
    let isDis = Object.values(result).every((item) => item === true);
    console.log('isDis', isDis);
    // oSubmitBtn.setAttribute('disabled', true);
    if (isDis) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', true);
    }
  }

  handleSubmitClick() {
    const falseIndex = Object.values(this.result).findIndex((item) => !item);

    if (falseIndex !== -1) {
      const falsekey = Object.keys(this.result)[falseIndex];
      const { msg } = this.validators[falsekey](
        FormCheck.stateMap[falsekey].state
      );
      this.noPass(falsekey, FormCheck.stateMap[falsekey].state, msg);

      // console.log('submitbtnDom', submitbtnDom);
      return;
    }
    // submitbtnDom.setAttribute('disabled', false);

    this.handleSubmit(FormCheck.exportState());
  }

  static exportState() {
    let result = {};
    for (let key in FormCheck.stateMap) {
      result[key] = FormCheck.stateMap[key].state;
    }
    return result;
  }

  static createStateMap(formData) {
    /* 
      {
        realname:{
          state,
          setState
        }
      }
    
    */
    const stateMap = {};

    for (let key in formData) {
      const [state, setState] = useState(formData[key]);
      stateMap[key] = {
        state,
        setState,
      };
    }

    return stateMap;
  }

  static create(
    formRef,
    elClass,
    { formData, validators, pass, noPass, handleSubmit }
  ) {
    new FormCheck(formRef, elClass, {
      formData,
      validators,
      pass,
      noPass,
      handleSubmit,
    });
    return FormCheck.stateMap;
  }
}
