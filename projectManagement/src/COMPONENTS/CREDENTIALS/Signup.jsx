import React from 'react'
import { setUserEmail, setUserPass, setUserName } from '../../REDUX/credentialSlice'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
import axios from 'axios'
import { useState } from 'react'
export default function Signup(props) {

  const signupApi = 'http://localhost:8000/Credential/Signup';
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => {
    return state.credentials.userEmail
  })

  const userPassword = useSelector((state) => {
    return state.credentials.userPassword
  })

  const userName = useSelector((state) => {
    return state.credentials.userName
  })

  const [nameRequired, setNameReq] = useState('');
  const [emailRequired, setEmailReq] = useState('');
  const [passRequired, setPassReq] = useState('');

  const signupUser = () => {
    if (userName === '') {
      $('#signupNameLabel').css({
        'color': 'red'
      })
      $('#signupNameValue').css({
        'border': '1px solid red'
      })
      setNameReq('Name required')
    }
    if (userEmail === '') {
      $('#signupEmailLabel').css({
        'color': 'red'
      })
      $('#signupEmailValue').css({
        'border': '1px solid red'
      })
      setEmailReq('Email required')
    }
    if (userPassword === '') {
      $('#signupPassLabel').css({
        'color': 'red'
      })
      $('#signupPassValue').css({
        'border': '1px solid red'
      })
      setPassReq('Password required')
    }
    if (userName !== '' && userEmail !== '' && userPassword !== '') {
      axios.post(signupApi, {
        name: userName,
        email: userEmail,
        password: userPassword
      })
        .then((response) => {
          console.log(response.data)
          if (response.data.success)
            toLogin();
          else 
            props.setNegetiveResponse(response.data.message)
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }

  const resetBlank = () => {
    props.setNegetiveResponse('');
    setNameReq('');
    setPassReq('');
    setEmailReq('');
    if (userName === '') {
      $('#signupNameLabel').css({
        'color': 'rgba(0, 0, 0, 0.8)'
      })
      $('#signupNameValue').css({
        'border': '1px solid rgba(0, 0, 0, 0.5)'
      })
    }
    if (userEmail === '') {
      $('#signupEmailLabel').css({
        'color': 'rgba(0, 0, 0, 0.8)'
      })
      $('#signupEmailValue').css({
        'border': '1px solid rgba(0, 0, 0, 0.5)'
      })
    }
    if (userPassword === '') {
      $('#signupPassLabel').css({
        'color': 'rgba(0, 0, 0, 0.8)'
      })
      $('#signupPassValue').css({
        'border': '1px solid rgba(0, 0, 0, 0.5)'
      })
    }
  }

  const toLogin = () => {
    props.setNegetiveResponse('');
    dispatch(setUserName(''));
    dispatch(setUserEmail(''));
    dispatch(setUserPass(''));
    props.setLoginSignup(prev => !prev)
  }


  return (
    <>
      <p id='signupHeading'>Fill Sign-up form</p>

      <div id='signupNameDiv'>
        <label htmlFor='signupNameValue' className='inputLabel' id='signupNameLabel'>Name</label>
        <input type='text' placeholder='Name...' className='inputField' value={userName} onChange={(e) => { dispatch(setUserName(e.target.value)) }} id='signupNameValue' onClick={(e) => { resetBlank(e) }}></input>
        <p className='loginFalse'>{nameRequired}</p>
      </div>

      <div id='signupEmailDiv'>
        <label htmlFor='signupEmailValue' className='inputLabel' id='signupEmailLabel'>Email</label>
        <input type='text' placeholder='Email...' className='inputField' value={userEmail} onChange={(e) => { dispatch(setUserEmail(e.target.value)) }} id='signupEmailValue' onClick={(e) => { resetBlank(e) }}></input>
        <p className='loginFalse'>{emailRequired}</p>
      </div>

      <div id='signupPassDiv'>
        <label htmlFor='signupPassValue' className='inputLabel' id='signupPassLabel'>Password</label>
        <input type='text' placeholder='Password...' className='inputField' onChange={(e) => { dispatch(setUserPass(e.target.value)) }} value={userPassword} id='signupPassValue' onClick={(e) => { resetBlank(e) }}></input>
        <p className='loginFalse'>{passRequired}</p>
      </div>

      <input type='button' value={'Signup'} className='buttonInput' id='signupButton' onClick={(e)=>{signupUser(e)}}></input>
      <p id='newToTechPrimeLab1'>Already have account?<span onClick={(e) => { toLogin(e) }}>Login</span></p>
    </>
  )
}
