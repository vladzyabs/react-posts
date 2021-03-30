import React           from 'react';
import { useMutation } from '@apollo/client';

import { Button, Container, Field, Loader } from '../../components/@ui';
import { useForm }                          from '../../utils';
import { graphql as gql }                   from '../../graphql';

function Register() {
  const [errors, setErrors]       = React.useState({});
  const [registerUser, {loading}] = useMutation(gql.REGISTER_USER);

  const {values, handleSubmit, handleChange} = useForm(
    {
      username:        '',
      password:        '',
      email:           '',
      confirmPassword: '',
    },
    handleRegister,
  );

  function handleRegister() {
    setErrors({});
    registerUser({
      variables: values,
    }).then(
      res => console.log(res),
      err => setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors),
    );
  }

  return (
    <div className={'page-wrapper'}>
      {loading && (
        <Loader />
      )}
      <Container>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && (
            Object.keys(errors).map((key, i) => <p key={i} style={{color: 'red'}}>{errors[key]}</p>)
          )}

          <Field
            label={'Имя'}
            name={'username'}
            value={values.username}
            onChange={handleChange}
          />
          <Field
            label={'Email'}
            name={'email'}
            type='email'
            value={values.email}
            onChange={handleChange}
          />
          <Field
            label={'Password'}
            name={'password'}
            type={'password'}
            value={values.password}
            onChange={handleChange}
          />
          <Field
            label={'Подтвердите пароль'}
            name={'confirmPassword'}
            type={'password'}
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <Button>Зарегистрироваться</Button>
        </form>
      </Container>
    </div>
  );
}

export default React.memo(Register);