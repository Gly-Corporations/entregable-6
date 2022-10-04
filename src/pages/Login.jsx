import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'; import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../store/slices/loader.slice';

const Login = () => {
  const [loginSignup, setLoginSignup] = useState(true)
  const [typeInput, setTypeInput] = useState('password')
  const [visibility, setVisibility] = useState('visibility')
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(setLoader(false))


  const resetData = () => {
    reset()
  }

  const submit = userData => {
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', userData)
      .then(res => {
        window.localStorage.setItem('token', res.data.data.token)
        resetData()
        alert('login')
        navigate('/')
      })
      .catch(error => {
        if(error.response?.status === 404){
          alert(error.response.data.message)
        }
        console.log(error.response)
      })
  }

  const userRegister = newUser => {
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', newUser)
      .then(() => {
        alert('User Register')
        resetData()
      })
  }

  const changeSection = () => {
    setLoginSignup(!loginSignup)
  }

  const isVisible = () => {
    if (typeInput === 'password' && visibility === 'visibility') {
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
              <input type={typeInput} placeholder='Password' {...register('password')} />
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
              <input type={typeInput} placeholder='Password' {...register('password')} />
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
