import React, { useState } from 'react';
import { Button, InputGroup, Modal, Form, Alert } from 'react-bootstrap';
import { Canvas } from './Canvas';
import { Toolbar } from './toolbar/Toolbar';
import { SettingBar } from './SettingBar';
import { useValidInput } from '../hooks/useValidInput';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { paintActions as PA } from '../store/paint/paint.slice';
import { userValidator } from '../utils/validator.utils';

export const App = () => {
  const [show, setShow] = useState(true);
  const input = useValidInput([userValidator]);
  const dispatch = useTypedDispatch();

  const setUsername = () => {
    if (input.isError || !input.value) return;
    setShow(false);
    dispatch(PA.setUsername(input.value));
  };

  return (
    <div className="app">
      <SettingBar />

      <div className="app__main">
        <Toolbar />
        <Canvas />
      </div>

      <Modal show={show} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to [Paint] Online</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3 mt-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              value={input.value}
              onChange={input.onChange}
              onBlur={input.onBlur}
              placeholder="Username"
              aria-label="Username"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          {input.isTouched && input.validError && (
            <Alert className="p-1" variant="danger">
              {input.validError}
            </Alert>
          )}

          <Button disabled={input.isError && input.isTouched} onClick={setUsername}>
            To Draw
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
