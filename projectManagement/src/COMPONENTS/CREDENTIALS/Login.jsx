import React, { useState } from 'react'
import {setUserEmail,setUserPass,setUserName} from '../../REDUX/credentialSlice'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login(props) {

  const loginApi = 'http://localhost:8000/Credential/Login';

  const Navigate = useNavigate();

  const userEmail = useSelector((state) => {
    return state.credentials.userEmail
  })

  const userPassword = useSelector((state) => {
    return state.credentials.userPassword
  })

  const dispatch = useDispatch();

  const [emailRequired, setEmailReq] = useState('');
  const [passRequired, setPassReq] = useState('');


  const loginUser = (e) => {
    e.preventDefault();
    if (userEmail === '') {
      $('#loginEmailLabel').css({
        'color': 'red'
      })
      $('#loginEmailValue').css({
        'border': '1px solid red'
      })
      setEmailReq('Email required')
    }
    if (userPassword === '') {
      $('#loginPassLabel').css({
        'color': 'red'
      })
      $('#loginPassValue').css({
        'border': '1px solid red'
      })
      setPassReq('Password required')
    }

    if (userEmail !== '' && userPassword !== '') {
      axios.post(loginApi, {
        email: userEmail,
        password:userPassword
      })
        .then((response) => {
          // console.log(response.data)
          if (response.data.success) {
            localStorage.setItem('userName', JSON.stringify(response.data.userData[0].name));
            localStorage.setItem('userId', JSON.stringify(response.data.userData[0]._id));
            dispatch(setUserPass(''));
            dispatch(setUserName(''));
            dispatch(setUserEmail(''));
            Navigate('/Userprojects');
          } else {
            props.setNegetiveResponse(response.data.message)
          }
        })
        .catch((error) => {
        console.log(error.message)
      })
    }
  }

  const toSignup = () => {
    props.setNegetiveResponse('');
    dispatch(setUserEmail(''));
    dispatch(setUserPass(''));
    props.setLoginSignup(prev => !prev)
  }

  const resetBlank = () => {
    if (userEmail === '') {
      $('#loginEmailLabel').css({
        'color': 'rgba(0, 0, 0, 0.8)'
      })
      $('#loginEmailValue').css({
        'border': '1px solid rgba(0, 0, 0, 0.5)'
      })
    }
    if (userPassword === '') {
      $('#loginPassLabel').css({
        'color': 'rgba(0, 0, 0, 0.8)'
      })
      $('#loginPassValue').css({
        'border': '1px solid rgba(0, 0, 0, 0.5)'
      })
    }
    props.setNegetiveResponse('');
    setEmailReq('');
    setPassReq('');
  }

  const unhidePassword = (e) => {
    e.preventDefault();
    if (e.target.parentElement.children[1].type === 'password') {
      e.target.parentElement.children[1].type = 'text';
      return;
    }
    e.target.parentElement.children[1].type = 'password';
  }

  return (
    <>
      <p id='LoginHeading'>Login to get started</p>
      <div id='loginEmailDiv'>
        <label htmlFor='loginEmailValue' className='inputLabel' id='loginEmailLabel'>Email</label>
        <input type='text' placeholder='Email...' className='inputField' value={userEmail} onChange={(e) => { dispatch(setUserEmail(e.target.value)) }} id='loginEmailValue' onClick={(e) => { resetBlank(e) }}></input>
        <p className='loginFalse'>{emailRequired}</p>
      </div>
      <div id='loginPassDiv'>
        <label htmlFor='loginPassword' className='inputLabel' id='loginPassLabel'>Password</label>
        <input type='password' placeholder='Password...' className='inputField' onChange={(e) => { dispatch(setUserPass(e.target.value)) }} value={userPassword} id='loginPassValue' onClick={(e) => { resetBlank(e) }}></input>
        <img src='../IMAGES/hide-password.svg' alt='Not' id='hidepassword' onClick={(e) => { unhidePassword(e) }}></img>
        <p className='loginFalse'>{passRequired}</p>
        <p id='forgotPassText'>Forgot Password?</p>
      </div>
      <input type='button' value={'Login'} className='buttonInput' id='loginButton' onClick={(e)=>{loginUser(e)}}></input>
      <p id='newToTechPrimeLab'>New to TechPrimeLab?<span onClick={(e) => { toSignup (e)}}>Signup First</span></p>
    </>
  )
}
