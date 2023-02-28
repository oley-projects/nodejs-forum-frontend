import Modal from './Modal';

const Signup = () => {
  return (
    <Modal>
      <header>Signup</header>
      <form>
        <div>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            id='name'
            name='name'
            required
            placeholder='Enter your Name'
          />{' '}
        </div>
        <div>
          <label htmlFor='email'>Email: </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            placeholder='Enter your email'
          />{' '}
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            id='password'
            name='password'
            required
            placeholder='Your password'
          />{' '}
        </div>
        <div>
          <label htmlFor='password2'>Confirm password: </label>
          <input
            type='password'
            id='password2'
            name='password2'
            required
            placeholder='Confirm password'
          />
        </div>
        <button>Signup</button>
      </form>
    </Modal>
  );
};
export default Signup;
