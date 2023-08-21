import React, { useEffect, useState } from 'react'
import '../../CSS/Dashboard.css'
import CountUp from 'react-countup'
import axios from 'axios';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';
export default function Dashboard() {

  const [dashCountData, setdashCountData] = useState({});

  const [dashChartData, setDashChartData] = useState([]);

  const dashboardCounterApi = 'http://localhost:8000/Project/DashboardCounter';

  const dashboardChartApi = 'http://localhost:8000/Project/DashboardChart';
  const userId = JSON.parse(localStorage.getItem('userId'));
  
  const getdashCountData = () => {
    axios.post(dashboardCounterApi, {
      userId:userId
    })
      .then((response) => {
        console.log(response.data)
        if (response.data.success) {
        setdashCountData(response.data)
      }
      })
      .catch((error) => {
      console.log(error.message)
    })
  }


  const getChartData = () => {
    axios.post(dashboardChartApi, {
      userId: userId
    })
      .then((response) => {
        console.log(response.data)
        if (response.data.success) {
          setDashChartData(response.data.chartData)
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    getdashCountData();
    getChartData();
  },[])
  return (
    <>
      <p className="dashboardHeading">Dashboard</p>
      {
        Object.keys(dashCountData).length > 0 ?
          <>
            <div className='dashDataWrap'>
              <div className='dashDataEle' id='dde1'>
                <p className='dashValue'>Total Projects<br></br>
                  <CountUp start={0} end={dashCountData.totalProjects} duration={1}></CountUp>
                </p>
              </div>
              <div className='dashDataEle' id='dde2'>
                <p className='dashValue'>Closed<br></br>
                  <CountUp start={0} end={dashCountData.closedProjects} duration={1}></CountUp>
                </p>
              </div>
              <div className='dashDataEle' id='dde3'>
                <p className='dashValue'>Running<br></br>
                  <CountUp start={0} end={dashCountData.runningProjects} duration={1}></CountUp>
                </p>
              </div>
              <div className='dashDataEle' id='dde4'>
                <p className='dashValue'>Closure Delay<br></br>
                  <CountUp start={0} end={dashCountData.closureDay} duration={1}></CountUp>
                </p>
              </div>
              <div className='dashDataEle' id='dde5'>
                <p className='dashValue'>Cancelled<br></br>
                  <CountUp start={0} end={dashCountData.cancelledProjects} duration={1}></CountUp>
                </p>
              </div>
            </div>
            <h1 id='chartHeading'>Department wise - Total Vs Closed</h1>
            <div className='chartWrapper'>
              <BarChart width={700} height={340} data={dashChartData}>
                <XAxis dataKey={"name"} height={60} />
                <YAxis width={60}/>
                <Tooltip />
                <Legend height={50}/>
                <Bar dataKey="Total" fill="rgba(4, 78, 146,1)" legendType='circle' barSize={15}>
                  <LabelList dataKey="Total" position="top" />
                </Bar>
                <Bar dataKey="Closed" fill="rgb(89, 166, 66)" legendType='circle' barSize={15} >
                  <LabelList dataKey="Closed" position="top" />
                </Bar>
              </BarChart>
            </div>
            <div className='chartWrapper1'>
              <BarChart width={330} height={340} data={dashChartData}>
                <XAxis dataKey={"name"} height={60} />
                <YAxis width={25} />
                <Tooltip />
                <Legend height={70} />
                <Bar dataKey="Total" fill="rgba(4, 78, 146,1)" legendType='circle' barSize={10}>
                  <LabelList dataKey="Total" position="top" />
                </Bar>
                <Bar dataKey="Closed" fill="rgb(89, 166, 66)" legendType='circle' barSize={10} >
                  <LabelList dataKey="Closed" position="top" />
                </Bar>
              </BarChart>
            </div>
          </> :
          <></>
      }
    </>
  )
}
