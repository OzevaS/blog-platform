export const formUsername = (name: string, register: any) => {
  return register(`${name}`, {
    required: 'Username is requied',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters long',
    },
    maxLength: {
      value: 20,
      message: 'Username must be less than 20 characters long',
    },
  });
};

export const formEmail = (name: string, register: any) => {
  return register(`${name}`, {
    required: 'Email is requied',
    pattern: {
      value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
      message: 'Invalid email address',
    },
  });
};

export const formPassword = (name: string, register: any) => {
  return register(`${name}`, {
    required: 'Password is requied',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters long',
    },
    maxLength: {
      value: 20,
      message: 'Password must be less than 20 characters long',
    },
  });
};

export const formPasswordConfirm = (name: string, password: string, register: any) => {
  return register(`${name}`, {
    required: 'Password repeat is requied',
    validate: (value: string) => {
      if (value === '') return true;
      if (value === password) return true;
      return 'Passwords do not match';
    },
  });
};

export const formConfirm = (name: string, register: any) => {
  return register(`${name}`, { required: 'Confirm is requied' });
};

export const formURL = (name: string, register: any) => {
  return register(`${name}`, {
    required: false,
    pattern: {
      value:
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
      message: 'Invalid URL',
    },
  });
};
