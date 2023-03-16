import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { useForumContext } from '../context/forumContext';

const Login = () => {
  const { closeModalLogin } = useForumContext();
  const [isShowPsw, setIsShowPsw] = useState<any>(false);

  return (
    <Modal closeHandler={closeModalLogin}>
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
        <button>
          <Link to='#'>Login</Link>
        </button>
      </form>
    </Modal>
  );
};
export default Login;
