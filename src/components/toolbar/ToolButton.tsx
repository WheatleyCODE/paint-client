import React, { FC, memo } from 'react';
import { Button } from 'react-bootstrap';
import { IconType } from 'react-icons';

export interface ToolButtonProps {
  onClick: () => void;
  isActive: boolean;
  Icon: IconType;
}

export const ToolButton: FC<ToolButtonProps> = memo(({ onClick, isActive, Icon }) => {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      className={`btn icon ${isActive && 'active'}`}
      type="submit"
    >
      <Icon className="icon" />
    </Button>
  );
});
