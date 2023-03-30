import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';

export interface ToolButtonProps {
  onClick: () => void;
  isActive: boolean;
  Icon: IconType;
}

export const ToolButton: FC<ToolButtonProps> = memo(({ onClick, isActive, Icon }) => {
  return (
    <button onClick={onClick} className={`btn icon ${isActive && 'active'}`} type="submit">
      <Icon className="icon" />
    </button>
  );
});
