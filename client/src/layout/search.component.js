import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  let history = useHistory();

  const submit = event => {
    event.preventDefault();

    // keyword
    //   ? history.push(`/?keyword=${keyword}&page=1`)
    //   : history.push(history.push(history.location.pathname));
  };

  return (
    <Form onSubmit={submit} inline>
      <Form.Control
        type="search"
        name="q"
        onChange={event => setKeyword(event.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
};

export default Search;
