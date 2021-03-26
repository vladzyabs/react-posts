// функция для валидации данных при регистрации пользователя
module.exports.validateRegisterInput = (
  email,
  password,
  confirmPassword,
  username,
) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(regExp)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password.length < 6) {
    errors.password = 'Password must be more than 6 characters ';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (
  email,
  password,
) => {
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }

  if (password === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateChangePasswordInput = (
  password,
  confirmPassword,
) => {
  const errors = {};

  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password.length < 6) {
    errors.password = 'Password must be more than 6 characters ';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// "$2a$12$yItKoSsZ6b12xR8lCMR5heyEf2BRokiZSrau723kYu.lwRQ1DiI5O"
// "$2a$12$yItKoSsZ6b12xR8lCMR5heyEf2BRokiZSrau723kYu.lwRQ1DiI5O"