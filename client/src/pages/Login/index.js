import React           from 'react';
import { useMutation } from '@apollo/client';

import { Button, Container, Field, Loader } from '../../components';
import { useForm }                          from '../../utils';
import { LOGIN_USER }                       from '../../graphql';
import { useAuth }                          from '../../context';
import { Redirect }                         from 'react-router-dom';

function Login() {
  const [errors, setErrors]    = React.useState({});
  const [loginUser, {loading}] = useMutation(LOGIN_USER);
  const {login}                = useAuth();

  const {values, handleChange, handleSubmit} = useForm(
    {
      email:    '',
      password: '',
    },
    handleLogin,
  );

  function handleLogin() {
    setErrors({});
    loginUser({
        variables: values,
      },
    ).then(
      res => {
        login(res.data.login);
        return <Redirect to='/' />;
      },
      err => setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors),
    );
  }

  return (
    <div className={'page-wrapper'}>
      {loading && (
        <Loader />
      )}

      <Container>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && (
            Object.keys(errors).map((key, i) => <p key={i}>{errors[key]}</p>)
          )}

          <Field
            label={'Email'}
            type={'email'}
            name={'email'}
            value={values.email}
            onChange={handleChange}
          />
          <Field
            label={'Password'}
            type={'password'}
            name={'password'}
            value={values.password}
            onChange={handleChange}
          />
          <Button type={'submit'}>login</Button>
        </form>
      </Container>
    </div>
  );
}

export default React.memo(Login);