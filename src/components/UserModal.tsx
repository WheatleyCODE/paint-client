import React, { useState } from 'react';
import { Alert, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { paintActions as PA } from '../store/paint/paint.slice';
import { useValidInput, useTypedDispatch } from '../hooks';
import { userValidator } from '../utils';

export const UserModal = () => {
  const [show, setShow] = useState(true);
  const input = useValidInput('', [userValidator]);

  const dispatch = useTypedDispatch();

  const setUsername = () => {
    if (input.isError || !input.value) return;
    setShow(false);
    dispatch(PA.setUsername(input.value));
  };

  return (
    <Modal data-testid="modal" show={show}>
      <Modal.Header className="user-modal__header" closeButton>
        <Modal.Title>Welcome to Paint Online</Modal.Title>
      </Modal.Header>

      <Modal.Body className="user-modal__body">
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

      <Modal.Footer className="user-modal__footer">
        {input.isTouched && input.validError && (
          <Alert title="alert" className="user-modal__alert" variant="danger">
            {input.validError}
          </Alert>
        )}

        <Button
          className="user-modal__btn btn btn-cian"
          disabled={input.isError && input.isTouched}
          onClick={setUsername}
        >
          Draw
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
