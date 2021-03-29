import { Button, Container, Field } from '../../components';

export default function Login() {
  return (
    <div className={'page-wrapper'}>
      <Container>
        <h1>Login</h1>

        <form>
          <Field label={'Email'} type={'email'} />
          <Field label={'Пароль'} type={'password'} />
          <Button>Войти</Button>
        </form>
      </Container>
    </div>
  );
}