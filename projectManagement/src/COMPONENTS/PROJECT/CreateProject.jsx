import React, { useState } from 'react'
import '../../CSS/CreateProject.css'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme, setReason, setType, setDivision, setCategory, setPriority, setDepartment, setStartDate, setEndDate, setLocation, setUserId, resetProject } from '../../REDUX/projectDataSlice'
import $ from 'jquery'
import axios from 'axios'
export default function CreateProject(props) {

  
  const newProjetApi ='http://localhost:8000/Project/Newproject'
  const [startDateFalse, setStartDateFalse] = useState('');
  const [endDateFalse, setEndDateFalse] = useState('');
  const [themeFalse, setThemeFalse] = useState('');

  const dispatch = useDispatch();
  dispatch(setUserId(JSON.parse(localStorage.getItem('userId'))));

  const projectData = useSelector((state) => {
    return state.projectData
  })

  const saveProject = (e) => {
    if (projectData.theme === '') {
      $('.projectThemeInput').css({
        'border': '2px solid red',
        'color': 'red'
      })
      setThemeFalse('Project theme/title required')
    }

    if (projectData.startDate === '') {
      $('#projectStartDate').css({
        'border': '2px solid red',
        'color': 'red'
      })
      setStartDateFalse('Start date required')
    }

    if (projectData.endDate === '') {
      $('#projectEndDate').css({
        'border': '2px solid red',
        'color': 'red'
      })
      setEndDateFalse('End date required')
    }

    if (projectData.theme !== '' && projectData.startDate !== '' && projectData.endDate !== '') {
      axios.post(newProjetApi, projectData)
        .then((response) => {
          console.log(response.data)
          if (response.data.success) {
            dispatch(resetProject());
            props.setTabStatus('listingProjects');
          }
        })
        .catch((error) => {
        console.log(error.message)
      })
    }
  }

  const checkDate = (e) => {
    e.preventDefault();
    let startDate = document.getElementById('projectStartDate').value;
    let endDate = document.getElementById('projectEndDate').value;
    if (startDate !== '' && endDate !== '') {
      let sd = new Date(startDate).getTime();
      let ed = new Date(endDate).getTime();
      if (sd === ed) {
        setStartDateFalse('Start date and End date cannot be same')
        setEndDateFalse('Start date and End date cannot be same')
      }
      else if (sd > ed) {
        if (e.target.id === 'projectStartDate') {
          setStartDateFalse('Start date is greater than end date')
          $('#projectStartDate').css({
            'border': '2px solid red',
            'color': 'red'
          })
        }
        else if (e.target.id === 'projectEndDate') {
          setEndDateFalse('End date is smaller than start date')
          $('#projectEndDate').css({
            'border': '2px solid red',
            'color': 'red'
          })
        }
      }
      else {
        dispatch(setStartDate(startDate));
        dispatch(setEndDate(endDate));
      }
    }
  }

  const resetErrors = () => {
    setStartDateFalse('');
    setEndDateFalse('');
    setThemeFalse('');
    $('#projectStartDate,#projectEndDate,.projectThemeInput').css({
      'border': '2px solid rgba(0, 0, 0, 0.3)',
      'color':'rgba(0, 0, 0, 0.8)'
    })
  }

  return (
    <>
      <p className="dashboardHeading">Create Project</p>
      <p className="dashboardHeading1">Create Project</p>
      <textarea className='projectThemeInput' placeholder='Enter Project Theme...(Max. 50 characters)' onChange={(e) => {
        if(e.target.value.length<51)
          dispatch(setTheme(e.target.value))
      }} value={projectData.theme} onClick={(e) => { resetErrors (e)}} spellCheck='false'></textarea>
      <p className='falseTheme'>{themeFalse}</p>


      <input type='button' value={'Save Project'} className='buttonInput' id='saveProjectButton' onClick={(e) => { saveProject()}}></input>

      <div id='projectReasonDiv' className='inputDiv'>
        <label htmlFor='projectReason' className='inputLabel'>Reason</label>
        <select className='projectInput' onClick={(e) => { dispatch(setReason(e.target.value)) }} id='projectReason'>
          <option value={'Business'}>For Business</option>
          <option value={'Dealership'}>For Dealership</option>
          <option value={'Transport'}>For Transport</option>
        </select>
      </div>

      <div id='projectTypeDiv' className='inputDiv'>
        <label htmlFor='projectType' className='inputLabel'>Type</label>
        <select className='projectInput' onClick={(e) => { dispatch(setType(e.target.value)) }} id='projectType'>
          <option>Internal</option>
          <option>External</option>
          <option>Vendor</option>
        </select>
      </div>

      <div id='projectDivisionDiv' className='inputDiv'>
        <label htmlFor='projectDivision' className='inputLabel'>Division</label>
        <select className='projectInput' id='projectDivision' onClick={(e) => { dispatch(setDivision(e.target.value)) }}>
          <option>Compressor</option>
          <option>Filter</option>
          <option>Pumps</option>
          <option>Glass</option>
          <option>Water Heater</option>
        </select>
      </div>

      <div id='projectCategoryDiv' className='inputDiv'>
        <label htmlFor='projectCategory' className='inputLabel'>Category</label>
        <select className='projectInput' id='projectCategory' onClick={(e) => { dispatch(setCategory(e.target.value))}}>
          <option>Quality A</option>
          <option>Quality B</option>
          <option>Quality C</option>
          <option>Quality D</option>
        </select>
      </div>

      <div id='projectPriorityDiv' className='inputDiv'>
        <label htmlFor='projectPriority' className='inputLabel'>Priority</label>
        <select className='projectInput' id='projectPriority' onClick={(e) => { dispatch(setPriority(Number(e.target.value))) }}>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
      </div>

      <div id='projectDepartmentDiv' className='inputDiv'>
        <label htmlFor='projectDepartment' className='inputLabel'>Department</label>
        <select className='projectInput' id='projectDepartment' onClick={(e) => { dispatch(setDepartment(e.target.value)) }}>
          <option>Strategy</option>
          <option>Finance</option>
          <option>Quality</option>
          <option>Maintenance</option>
          <option>Stores</option>
          <option>HR</option>
        </select>
      </div>

      <div id='projectStartDateDiv' className='inputDiv'>
        <label htmlFor='projectStartDate' className='inputLabel'>Start Date as per Project Plan</label>
        <input type='date' className='projectInputDate' id='projectStartDate' onChange={(e) => { checkDate(e) }} onClick={(e) => { resetErrors (e)}}></input>
        <p className='falseDate'>{startDateFalse}</p>
      </div>

      <div id='projectEndDateDiv' className='inputDiv'>
        <label htmlFor='projectEndDate' className='inputLabel'>End Date as per Project Plan</label>
        <input type='date' className='projectInputDate' id='projectEndDate' onChange={(e) => { checkDate(e) }} onClick={(e) => { resetErrors(e) }}></input>
        <p className='falseDate'>{endDateFalse}</p>
      </div>

      <div id='projectLocationDiv' className='inputDiv'>
        <label htmlFor='projectLocation' className='inputLabel' id='projectLocation'>Location</label>
        <select className='projectInput' onClick={(e) => { dispatch(setLocation(e.target.value)) }}>
          <option>Pune</option>
          <option>Delhi</option>
          <option>Mumbai</option>
        </select>
      </div>

      <p id='projectStatus'>Status : <span>Registered</span></p>
      <div className='dummy'></div>
    </>
  )
}
