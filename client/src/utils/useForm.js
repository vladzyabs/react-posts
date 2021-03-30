import { useState } from 'react';

export default function useForm(initialState = {}, callback) {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const {name, value} = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    callback?.();
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
}