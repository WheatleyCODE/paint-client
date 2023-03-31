import React, { useState } from 'react';
import { Alert, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { paintActions as PA } from '../store/paint/paint.slice';
import { useValidInput, useTypedDispatch } from '../hooks';
import { userValidator } from '../utils';

export const UserModal = () => {
  const [show, setShow] = useState(true);
  const input = useValidInput([userValidator]);

  const dispatch = useTypedDispatch();

  const setUsername = () => {
    if (input.isError || !input.value) return;
    setShow(false);
    dispatch(PA.setUsername(input.value));
  };

  return (
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
  );
};
