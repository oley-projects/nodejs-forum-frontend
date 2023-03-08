import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { usePostsContext } from '../context/postsContext';

const Signup = () => {
  const { closeModalSignup } = usePostsContext();
  const [isShowPsw, setIsShowPsw] = useState<any>(false);

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
        <div className='input'>
          <label htmlFor='password2'>Confirm password:</label>
          <input
            type={!isShowPsw ? 'password' : 'text'}
            id='password2'
            name='password2'
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
        <button>
          <Link to='#'>Signup</Link>
        </button>
      </form>
    </Modal>
  );
};
export default Signup;
