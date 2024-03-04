import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { useFormItemContext } from '../context/formItemContext';
import { useUserContext } from '../context/userContext';

const Login = () => {
  const { closeModalLogin } = useFormItemContext();
  const { loginUser } = useUserContext();
  const [isShowPsw, setIsShowPsw] = useState<any>(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [error, setError] = useState('');

  const loginHandler = () => {
    if (formData.password.length > 4 && formData.email) {
      loginUser(formData);
      closeModalLogin();
      setFormData({ email: '', password: '' });
    } else {
      if (!error) {
        setError('Invalid Form Data');
        setTimeout(() => setError(''), 5000);
      }
    }
  };
  return (
    <Modal closeHandler={closeModalLogin}>
      {error && (
        <div className='error-block'>
          <p>{error}</p>
        </div>
      )}
      <header className='text-center'>
        <h3>Login</h3>
      </header>
      <form>
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
        <div className='show-psw'>
          <input
            type='checkbox'
            id='checkbox'
            value={isShowPsw}
            onChange={() => setIsShowPsw(!isShowPsw)}
          />
          <label htmlFor='checkbox'>show password</label>
        </div>
        <button onClick={loginHandler}>
          <Link to='#'>Login</Link>
        </button>
      </form>
    </Modal>
  );
};
export default Login;
