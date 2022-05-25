import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { CheckCircle, CheckCircleOutlined } from '@mui/icons-material';

/**
 * Password props
 * @param {string=} defaultValue - The input default value.
 * @param {string} label - The label on top of container.
 * @param {string=} placeholder - The input element placeholder.
 * @param {boolean=} checkUppercase - The switch for check uppercase.
 * @param {boolean=} checkLowercase - The switch for check lowercase.
 * @param {boolean=} checkOneNumber - The switch for check at least have one number.
 * @param {boolean=} checkSpecialChar - The switch for check have speical character.
 * @param {number=} checkLonger - The number for check value is longer than.
 */
interface PasswordProps {
  defaultValue?: string;
  label: string;
  placeholder?: string;
  checkUppercase?: boolean;
  checkLowercase?: boolean;
  checkOneNumber?: boolean;
  checkSpecialChar?: boolean;
  checkLonger?: number;
}

/**
 * The function for generate check icon
 * @param {boolean} flag - Switch to display the specific icon.
 */
const genCheckIcon = (flag: boolean) =>
  flag ? (
    <CheckCircle className="text-lightBlue" />
  ) : (
    <CheckCircleOutlined className="text-gray-700" />
  );

const Password = (props: PasswordProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [validUppercase, setValidUppercase] = useState<boolean>(true);
  const [validLowercase, setValidLowercase] = useState<boolean>(true);
  const [validOneNumber, setValidOneNumber] = useState<boolean>(true);
  const [validSpecialChar, setValidSpecialChar] = useState<boolean>(true);
  const [validLonger, setValidLonger] = useState<boolean>(true);
  const [isType, setIsType] = useState<boolean>(false);

  const haveCheckItem =
    props?.checkUppercase ||
    props?.checkLowercase ||
    props?.checkOneNumber ||
    props?.checkSpecialChar ||
    (props?.checkLonger && props.checkLonger > 0);

  /**
   * The function for validate the input value
   * @param {HTMLInputElement} e - The input element props.
   */
  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (!isType) setIsType(true);
    if (props?.checkUppercase) {
      setValidUppercase(/[A-Z]/.test(text));
    }
    if (props?.checkLowercase) {
      setValidLowercase(/[a-z]/.test(text));
    }
    if (props?.checkOneNumber) {
      setValidOneNumber(/[0-9]{1,}/.test(text));
    }
    if (props?.checkSpecialChar) {
      setValidSpecialChar(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(text));
    }
    if (props?.checkLonger && props.checkLonger > 0) {
      setValidLonger(text.length > props.checkLonger);
    }
  };

  return (
    <>
      <form
        className="w-[335px] h-[58px]"
        onClick={() => {
          inputRef.current && inputRef.current.focus();
        }}
      >
        <fieldset
          className={classNames(
            'border-lightGrey border-[3px] hover:border-white rounded-[8px] tracking-[0.4px] text-[12px]',
            isFocus || isType ? 'border-skyBlue hover:border-skyBlue' : ''
          )}
        >
          <legend className="ml-3 text-white px-0.5">{props.label}</legend>
          <input
            type="password"
            ref={inputRef}
            className="text-[16px] text-white m-[12px] mb-[15px] h-3 w-[300px] bg-transparent focus:outline-none"
            placeholder={props?.placeholder}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={validateInput}
            value={props?.defaultValue}
          />
        </fieldset>
      </form>
      <div
        className={classNames(
          'text-white mt-[20px] py-1 px-[12px] w-[335px] bg-[#242424] rounded-[8px] shadow-boxShadow',
          isType && haveCheckItem ? '' : 'hidden'
        )}
      >
        {props?.checkUppercase && (
          <div className="py-[9.5px] flex items-center">
            <span className="mr-[12px]">{genCheckIcon(validUppercase)}</span>
            <div className="text-[14px] tracking-[0.25px] flex flex-wrap grow-0">
              Have at least one uppercase letter
            </div>
          </div>
        )}
        {props?.checkLowercase && (
          <div className="py-[9.5px] flex items-center">
            <span className="mr-[12px]">{genCheckIcon(validLowercase)}</span>
            <div className="text-[14px] tracking-[0.25px] flex flex-wrap">
              Have at least one lowercase letter
            </div>
          </div>
        )}
        {props?.checkOneNumber && (
          <div className="py-[9.5px] flex items-center">
            <span className="mr-[12px]">{genCheckIcon(validOneNumber)}</span>
            <div className="text-[14px] tracking-[0.25px] flex flex-wrap">
              Have at least one number
            </div>
          </div>
        )}
        {props?.checkSpecialChar && (
          <div className="py-[9.5px] flex items-center">
            <span className="mr-[12px]">{genCheckIcon(validSpecialChar)}</span>
            <div className="text-[14px] tracking-[0.25px] flex flex-wrap">
              Have at least one special character (!@#$...etc)
            </div>
          </div>
        )}
        {props?.checkLonger && props.checkLonger > 0 && (
          <div className="py-[9.5px] flex items-center">
            <span className="mr-[12px]">{genCheckIcon(validLonger)}</span>
            <div className="text-[14px] tracking-[0.25px] flex flex-wrap">
              Longer than {props.checkLonger} characters
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Password;
