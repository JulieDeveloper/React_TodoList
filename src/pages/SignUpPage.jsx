import Swal from 'sweetalert2';
import { Link, navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { register } from '../api/auth';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = async () => {
    try {
      if (email.length <= 0) return;
      if (username.length <= 0) return;
      if (password.length <= 0) return;

      const { success, authToken } = await register({
        email,
        username,
        password,
      });

      if (success) {
        localStorage.setItem('authToken', authToken);
        // success register message
        Swal.fire({
          position: 'top',
          title: '註冊成功！',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        });
        navigate('/todos');
        return;
      }
      // fail register message
      Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號 "
          value={username}
          onChange={(usernameInputValue) => {
            setUsername(usernameInputValue);
          }}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="email"
          placeholder="請輸入email"
          value={email}
          onChange={(emailInputValue) => {
            setEmail(emailInputValue);
          }}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) => {
            setPassword(passwordInputValue);
          }}
        />
      </AuthInputContainer>
      <AuthButton onChange={handleChange}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
