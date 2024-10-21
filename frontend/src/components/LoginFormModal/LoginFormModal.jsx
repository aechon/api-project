import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(()=> {
        closeModal()
        navigate('/')
        navigate(0)
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      })
  };

  const demoLogin = (e) => {
    e.preventDefault();
    const demoUser = {
      credential: 'demo@user.io',
      password: 'password'
    }
    return dispatch(sessionActions.login(demoUser))
      .then(()=> {
        closeModal()
        navigate('/')
        navigate(0)
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      })
  };

  useEffect(() => {
    if (credential.length < 4 || password.length < 6) setDisable(true);
    else setDisable(false);
  }, [credential, password])

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button disabled={disable} type="submit">Log In</button>
      </form>
      <button onClick={demoLogin}>Demo User</button>
    </>
  );
}

export default LoginFormModal;