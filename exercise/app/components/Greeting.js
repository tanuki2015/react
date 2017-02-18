import React from 'react';

function GreetingUser(props) {
  return <h3>welcome back!</h3>;
}

function GreetingGuest(props) {
  return <h3>please sign up</h3>;
}

function Greeting(props) {
  const isLogged = props.isLogged;
  if (isLogged) {
    return <GreetingUser />;
  }
  return <GreetingGuest />;
}

export default Greeting;
