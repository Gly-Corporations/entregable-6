import { useState } from 'react'
import { useForm } from 'react-hook-form'; import React from 'react';

const Login = () => {
  const [loginSignup, setLoginSignup] = useState(true)
  const [typeInput, setTypeInput] = useState('password')
  const [visibility, setVisibility] = useState('visibility')
  const { register, handleSubmit, reset } = useForm()

  const resetData = () => {
    reset()
  }
  
  const submit = userData => {
    console.log(userData)
    resetData()
  }

  const userRegister = newUser => {
    console.log(newUser)
  }

  const changeSection = () => {
    setLoginSignup(!loginSignup)
  }

  const isVisible = () => {
    if(typeInput === 'password' && visibility === 'visibility') {
      setTypeInput('text')
      setVisibility('visibility_off')
    } else {
      setTypeInput('password')
      setVisibility('visibility')
    }
  }

  return (
    <div className='form-container'>
      {
        loginSignup ? (
          <form onSubmit={handleSubmit(submit)}>
            <h2>Welcome! enter you email and password to continue</h2>
            <article className='test-data'>
              <b>Test data</b>
              <p>mason@gmail.com</p>
              <p>mason1234</p>
            </article>
            <input type='email' placeholder='Email' {...register('email')} />
            <div className='input-password'>
              <input type={typeInput} placeholder='Password' {...register('pass')} />
              <span onClick={() => isVisible()} className='material-symbols-outlined is-visible'>{visibility}</span>
            </div>
            <button>Login</button>
            <p>Don't have an account? <span onClick={() => changeSection()}>Sign up</span></p>
          </form>
        ) : (
          <form onSubmit={handleSubmit(userRegister)}>
            <h2>Sign up</h2>
            <input type='email' placeholder='Email' {...register('email')} />
            <input type='text' placeholder='Fisrt Name' {...register('firstName')} />
            <input type='text' placeholder='Last Name' {...register('lastName')} />
            <div className='input-password'>
              <input type={typeInput} placeholder='Password' {...register('newPass')} />
              <span onClick={() => isVisible()} className='material-symbols-outlined is-visible'>{visibility}</span>
            </div>
            <input type='text' placeholder='Phone Number' {...register('phone')} />
            <button>Sign up</button>
            <p>Already have an account? <span onClick={() => changeSection()}>Login</span></p>
          </form>
        )
      }
    </div>
  );
};

export default Login;
