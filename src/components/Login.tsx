import Modal from './Modal';

const Login = () => {
  return (
    <Modal>
      <header>Login</header>
      <form>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            placeholder='Enter your email'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            placeholder='Your password'
          />
        </div>
        <button>Login</button>
      </form>
    </Modal>
  );
};
export default Login;
