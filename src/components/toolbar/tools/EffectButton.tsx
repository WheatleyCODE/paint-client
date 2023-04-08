import React, { FC } from 'react';
import { IconType } from 'react-icons';
import { Button } from 'react-bootstrap';
import { paintActions } from '../../../store';
import { useTypedDispatch } from '../../../hooks';
import { EffectTypes } from '../../../types';

export interface IEffectButtonProps {
  effectType: EffectTypes;
  isActive: boolean;
  Icon: IconType;
}

export const EffectButton: FC<IEffectButtonProps> = (props) => {
  const { effectType, isActive, Icon } = props;
  const dispatch = useTypedDispatch();

  const onClickHandler = () => {
    dispatch(paintActions.setCurrentEffect(effectType));
  };

  return (
    <Button onClick={onClickHandler} className={`btn icon btn-cian ${isActive && 'active'}`}>
      <Icon />
    </Button>
  );
};
