import React, { FC } from 'react';

export interface IUserSelectProps {
  name?: string;
}

export const UserSelect: FC<IUserSelectProps> = ({ name }) => {
  const dataSelect = name || undefined;
  const className = name ? 'select-connection' : 'select';

  return (
    <div data-select={dataSelect} id="select" className={className}>
      <div className="circle" />
      <div className="triangle">
        <div data-triangle="bottom" className="triangle__bottom" />
        <div data-triangle="right" className="triangle__right" />
        <div data-triangle="left" className="triangle__left" />
      </div>
      {name && <div className="select-connection__name">{name}</div>}
    </div>
  );
};
