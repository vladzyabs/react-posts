import React           from 'react';
import { Redirect }    from 'react-router-dom';
import { useMutation } from '@apollo/client';

import PATHS       from '../../paths';
import {
  Button,
  Loader,
  Field,
}                  from '../../components';
import { useAuth } from '../../context';
import { useForm } from '../../utils';
import { graphql } from '../../graphql';

export default function CreatePost() {
  const [errors, setErrors]     = React.useState({});
  const {user}                  = useAuth();
  const [createPost, {loading}] = useMutation(graphql.CREATE_POST_MUTATION);

  const {values, handleSubmit, handleChange} = useForm({
    title: '',
    body:  '',
  }, handleCreate);

  function handleCreate() {
    createPost({
      variables: values,
    }).then(
      res => {
        return <Redirect to={PATHS.HOME} />;
      },
      err => setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors || {}),
    );
  }

  if (!user) {
    return <Redirect to={PATHS.LOGIN} />;
  }

  return (
    <div className={'page-wrapper'}>
      {loading && (
        <Loader />
      )}
      <h1>Create post</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(errors).length > 0 && (
          Object.keys(errors).map((key, i) => <p key={i} style={{color: 'red'}}>{errors[key]}</p>)
        )}

        <Field
          label={'title'}
          name={'title'}
          value={values.title}
          onChange={handleChange}
        />
        <Field
          label={'body'}
          name={'body'}
          value={values.body}
          onChange={handleChange}
        />
        <Button type={'submit'}>Create</Button>
      </form>
    </div>
  );
}