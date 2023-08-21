import React, { useState } from 'react'
import '../../CSS/Userwindow.css'
import CreateProject from './CreateProject'
import Dashboard from './Dashboard'
import ListingPage from './ListingPage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function UserWindow() {

  const [tabStatus, setTabStatus] = useState('');
  const [dasboardView, setDashBoard] = useState(true);
  const logoutApi = 'http://localhost:8000/Credential/Logout';
  const Navigate = useNavigate();
  const logoutUser = (e) => {
    e.preventDefault();
    axios.post(logoutApi, {
      userId:JSON.parse(localStorage.getItem('userId'))
    })
      .then((response) => {
        if (response.data.success) {
          localStorage.clear();
          Navigate('/');
      }
      })
      .catch((error) => {
      console.log(error.message)
    })
  }

  return (
    <>
      <div className='userOptions'>
        <img src='../IMAGES/Dashboard.svg' id='dashInactive' className='optionInactive' alt='Not' onClick={(e) => {
          setDashBoard(true);
          setTabStatus('');
        }}></img>
        <img src='../IMAGES/Project-list.svg' id='listInactive' className='optionInactive' alt='Not' onClick={(e) => {
          setDashBoard(false);
          setTabStatus('listingProjects')
        }}></img>
        <div id='divideOpt'></div>
        <img src='../IMAGES/create-project.svg' id='addInactive' className='optionInactive' alt='Not' onClick={(e) => {
          setDashBoard(false);
          setTabStatus('createProject')
        }}></img>
        <img src='../IMAGES/Logout.svg' id='logoutIcon' className='optionInactive' alt='Not' onClick={(e)=>{logoutUser(e)}}></img>
        {
          dasboardView ?
            <img src='../IMAGES/Dashboard-active.svg' id='dashInactive' className='optionInactive' alt='Not'></img> :
            <></>
        }
        {
          tabStatus === 'createProject' ?
            <img src='../IMAGES/create-project-active.svg' id='addInactive' className='optionInactive' alt='Not'></img> :
            <></>
        }
        {
          tabStatus === 'listingProjects' ?
            <img src='../IMAGES/Project-list-active.svg' id='listInactive' className='optionInactive' alt='Not'></img> :
            <></>
        }
      </div>
      <div className='userWindow'>
        <img src='../IMAGES/Logout.svg' id='logoutIconPhone' className='optionInactive' alt='Not' onClick={(e) => { logoutUser(e) }}></img>
        <img src='../IMAGES/Header-bg.svg' alt='Not' className='userWindowHeadImg'></img>
        <img src='../IMAGES/Logo.svg' alt='Not' className='userWindowLogo'></img>
        {
          dasboardView ?
            <Dashboard /> :
            <div className='userDataSubWindow'>
              {
                tabStatus === 'createProject' ?
                  <CreateProject setTabStatus={setTabStatus} /> :
                  <></>
              }
              {
                tabStatus === 'listingProjects' ?
                  <ListingPage /> :
                  <></>
              }
            </div>
            
        }
      </div>
    </>
  )
}
