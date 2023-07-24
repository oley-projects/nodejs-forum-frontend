import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { useFormItemContext } from '../context/formItemContext';
import { useAuthContext } from '../context/authContext';

const Signup = () => {
  const { closeModalSignup } = useFormItemContext();
  const { signupUser } = useAuthContext();
  const [isShowPsw, setIsShowPsw] = useState<any>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signUpHandler = () => {
    if (
      formData.name.length > 2 &&
      formData.email &&
      formData.password.length > 4 &&
      formData.password2.length > 4 &&
      formData.password === formData.password2
    ) {
      signupUser(formData);
      closeModalSignup();
      setFormData({
        name: '',
        email: '',
        password: '',
        password2: '',
      });
    } else {
      console.log('Invalid Data');
    }
  };

  return (
    <Modal closeHandler={closeModalSignup}>
      <header className='text-center'>
        <h3>Signup</h3>
      </header>
      <form>
        <div className='input'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name || ''}
            onChange={inputChange}
            required
            placeholder='Enter your Name'
          />
        </div>
        <div className='input'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email || ''}
            onChange={inputChange}
            required
            placeholder='Enter your email'
          />
        </div>
        <div className='input'>
          <label htmlFor='password'>Password:</label>
          <input
            type={!isShowPsw ? 'password' : 'text'}
            id='password'
            name='password'
            value={formData.password || ''}
            onChange={inputChange}
            required
            placeholder='Enter password'
          />
        </div>
        <div className='input'>
          <label htmlFor='password2'>Confirm password:</label>
          <input
            type={!isShowPsw ? 'password' : 'text'}
            id='password2'
            name='password2'
            value={formData.password2 || ''}
            onChange={inputChange}
            required
            placeholder='Confirm password'
          />
        </div>
        <div className='show-psw'>
          <input
            type='checkbox'
            id='checkbox'
            value={isShowPsw}
            onChange={() => setIsShowPsw(!isShowPsw)}
          />
          <label htmlFor='checkbox'>show password</label>
        </div>
        <button onClick={signUpHandler}>
          <Link to='#'>Signup</Link>
        </button>
      </form>
    </Modal>
  );
};
export default Signup;
