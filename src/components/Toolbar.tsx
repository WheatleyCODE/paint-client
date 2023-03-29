import React from 'react';
import { MdBrush, MdSquare, MdCircle, MdOutlineHorizontalRule } from 'react-icons/md';
import { RiEraserFill } from 'react-icons/ri';

export const Toolbar = () => {
  return (
    <div className="toolbar">
      <input type="color" className="input color" />

      <div className="toolbar__tools">
        <button className="btn icon" type="submit">
          <MdBrush className="icon" />
        </button>

        <button className="btn icon" type="submit">
          <MdSquare className="icon" />
        </button>

        <button className="btn icon" type="submit">
          <MdCircle className="icon" />
        </button>

        <button className="btn icon" type="submit">
          <RiEraserFill className="icon" />
        </button>

        <button className="btn icon" type="submit">
          <MdOutlineHorizontalRule className="icon" />
        </button>
      </div>

      <input type="range" min="0" max="100" />
    </div>
  );
};
