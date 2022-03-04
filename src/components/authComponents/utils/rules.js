const required = (name) => ({
  required: `${name} is required`,
});

const minLength = (name, value) => ({
  minLength: {
    value,
    message: `${name} must be at least ${value} characters`,
  },
});

const maxLength = (name, value) => ({
  maxLength: {
    value,
    message: `${name} must not exceed ${value} characters`,
  },
});

const minMaxLength = (name, min, max) => ({
  ...minLength(name, min),
  ...maxLength(name, max),
});

const email = () => ({
  // react-hook-form examples
  // pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Invalid email address",
  },
});

const match = (values) => ({
  validate: {
    match: (value) => {
      const { password } = values;
      return password === value || "Password does not match";
    },
  },
});

const avatar = () => ({
  pattern: {
    // value: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    value:
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/,
    message: "Invalid url address",
  },
});

const rules = {
  required,
  minLength,
  maxLength,
  minMaxLength,
  email,
  match,
  avatar,
};

export default rules;
