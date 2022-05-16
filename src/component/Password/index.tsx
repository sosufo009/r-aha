import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { CheckCircle, CheckCircleOutlined } from '@mui/icons-material';

const genCheckIcon = (flag: boolean) => (flag ? <CheckCircle className="text-lightBlue" /> : <CheckCircleOutlined className="text-gray-700" />);

function Password() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [validUppercase, setValidUppercase] = useState<boolean>(false);
  const [validLowercase, setValidLowercase] = useState<boolean>(false);
  const [validOneNumber, setValidOneNumber] = useState<boolean>(false);
  const [validSpecialChar, setValidSpecialChar] = useState<boolean>(false);
  const [validLonger, setValidLonger] = useState<boolean>(false);

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValidUppercase(/[A-Z]/.test(text));
    setValidLowercase(/[a-z]/.test(text));
    setValidOneNumber(/[0-9]{1,}/.test(text));
    setValidSpecialChar(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(text));
    setValidLonger(text.length > 7);
  };

  return (
    <>
      <form className="w-[335px] h-[58px]" onClick={() => { inputRef.current && inputRef.current.focus(); }}>
        <fieldset
          className={classNames(
            'border-lightGrey border-[3px] hover:border-white rounded-[8px] tracking-[0.4px] text-[12px]',
            isFocus ? 'border-skyBlue hover:border-skyBlue' : '',
          )}
        >
          <legend
            className="ml-3 text-white px-0.5"
          >
            Password
          </legend>
          <input
            type="password"
            ref={inputRef}
            className="text-[16px] text-white m-[12px] mb-[15px] h-3 w-[300px] bg-transparent focus:outline-none"
            placeholder="Password"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={validateInput}
          />
        </fieldset>
      </form>
      {isFocus
        && (
          <div className="text-white mt-[20px] py-1 px-[12px] w-[335px] bg-[#242424] rounded-[8px] shadow-boxShadow">
            <div className="py-[9.5px] flex items-center">
              <span className="mr-[12px]">
                {genCheckIcon(validUppercase)}
              </span>
              <div className="text-[14px] tracking-[0.25px] flex flex-wrap grow-0">
                Have at least one uppercase letter
              </div>
            </div>
            <div className="py-[9.5px] flex items-center">
              <span className="mr-[12px]">
                {genCheckIcon(validLowercase)}
              </span>
              <div className="text-[14px] tracking-[0.25px] flex flex-wrap">
                Have at least one lowercase letter
              </div>
            </div>
            <div className="py-[9.5px] flex items-center">
              <span className="mr-[12px]">
                {genCheckIcon(validOneNumber)}
              </span>
              <div className="text-[14px] tracking-[0.25px] flex flex-wrap">
                Have at least one number
              </div>
            </div>
            <div className="py-[9.5px] flex items-center">
              <span className="mr-[12px]">
                {genCheckIcon(validSpecialChar)}
              </span>
              <div className="text-[14px] tracking-[0.25px] flex flex-wrap">
                Have at least one special character (!@#$...etc)
              </div>
            </div>
            <div className="py-[9.5px] flex items-center">
              <span className="mr-[12px]">
                {genCheckIcon(validLonger)}
              </span>
              <div className="text-[14px] tracking-[0.25px] flex flex-wrap">
                Longer than 8 characters
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default Password;
