import { Container } from '../../components';

import { Button, Field } from '../../components';

export default function Register() {
  return (
    <div className={'page-wrapper'}>
      <Container>
        <h1>Register</h1>
        <form>
          <Field label={'Имя'} />
          <Field label={'Аватар'} type={'file'} />
          <Field label={'Email'} type='email' />
          <Field label={'Пароль'} type={'password'} />
          <Field label={'Подтвердите пароль'} type={'password'} />
          <Button>Зарегистрироваться</Button>
        </form>
      </Container>
    </div>
  );
}