import React, { useCallback, useState } from 'react';

export interface IValidInputOpts {
  value: string;
  isFocus: boolean;
  isActive: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  isError: boolean;
  isTouched: boolean;
  validError: string | null;
  changeValue: (string: string) => void;
  changeFocus: (boolean: boolean) => void;
  changeActive: (boolean: boolean) => void;
}

export type IValidator = (str: string) => string | null;

export const useValidInput = (validators: IValidator[] = []): IValidInputOpts => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [validError, setValidError] = useState<null | string>(null);
  const [isTouched, setIsTouched] = useState(false);
  let counter = 0;

  const onBlur = useCallback(() => {
    setIsTouched(true);
    setIsFocus(false);

    if (!value) setIsActive(false);
  }, []);

  const onFocus = useCallback(() => {
    setIsFocus(true);
    setIsActive(true);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (counter === 0 && e.target.value.length !== 1) {
      setIsTouched(true);
    }

    validators.forEach((fn) => {
      setValidError(fn(e.target.value));
    });

    counter += 1;
  }, []);

  const changeFocus = useCallback((boolean: boolean) => {
    setIsFocus(boolean);
  }, []);

  const changeActive = useCallback((boolean: boolean) => {
    setIsActive(boolean);
  }, []);

  const changeValue = useCallback((string: string) => {
    setValue(string);
  }, []);

  return {
    value,
    isFocus,
    isActive,
    onChange,
    onBlur,
    onFocus,
    isError: !!(isTouched && validError),
    isTouched,
    validError,
    changeValue,
    changeFocus,
    changeActive,
  };
};
