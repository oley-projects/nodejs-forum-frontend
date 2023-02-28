import { Link } from 'react-router-dom';
import Modal from './Modal';
import { usePostsContext } from '../context/postsContext';

const Login = () => {
  const { closeModalLogin } = usePostsContext();
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
            type='password'
            id='password'
            name='password'
            required
            placeholder='Enter password'
          />
        </div>
        <button>
          <Link to='#'>Login</Link>
        </button>
      </form>
    </Modal>
  );
};
export default Login;
