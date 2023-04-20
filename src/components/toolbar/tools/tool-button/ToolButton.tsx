import React, { FC, memo } from 'react';
import { Button } from 'react-bootstrap';
import { IconType } from 'react-icons';

export interface ToolButtonProps {
  onClick: () => void;
  isActive: boolean;
  deg?: boolean;
  Icon: IconType;
}

export const ToolButton: FC<ToolButtonProps> = memo(({ onClick, isActive, Icon, deg }) => {
  return (
    <Button
      data-testid="tool-button"
      variant="primary"
      onClick={onClick}
      className={`btn btn-cian icon ${isActive && 'active'}`}
      type="submit"
    >
      <Icon className={`icon ${deg && 'deg35'}`} />
    </Button>
  );
});
