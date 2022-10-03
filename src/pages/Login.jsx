import { useState } from 'react'
import { useForm } from 'react-hook-form';import React from 'react';

const Login = () => {
    const [loginSignup, setLoginSignup] = useState(true)
    const { register, handleSubmit, reset } = useForm()
    
    const submit = userData => {
      console.log(userData)
    }
    
    const userRegister = newUser => {
      console.log(newUser)
    }
    
    const changeSection = () => {
      setLoginSignup(!loginSignup)
    }
    
    console.log('hello word')
  
    return (
        <div className='form-container'>
          {
            loginSignup ? (
              <form onSubmit={handleSubmit(submit)}>
              <h2>Welcome! enter you email and password to continue</h2>
              <article>
                <b>Test data</b>
                <p>mason@gmail.com</p>
                <p>mason1234</p>
              </article>
            <input type='email' placeholder='Email' {...register('email')}/>
            <input type='password' placeholder='Password' {...register('pass')}/>
            <button>Login</button>
             <p>Don't have an account?<span onClick={() => changeSection()}>Sign up</span></p>
          </form>
            ) : (
              <form onSubmit={handleSubmit(userRegister)}>
              <h2>Sign up</h2>
            <input type='email' placeholder='Email' {...register('email')}/>
            <input type='text' placeholder='Fisrt Name' {...register('firstName')}/>
            <input type='text' placeholder='Last Name' {...register('lastName')}/>
            <input type='password' placeholder='Password' {...register('pass')}/>
            <input type='text' placeholder='Phone Number' {...register('phone')}/>
            <button>Sign up</button>
             <p>Already have an account?<span onClick={() => changeSection()}>Login</span></p>
          </form>
            )
          }
        </div>
    );
};

export default Login;
