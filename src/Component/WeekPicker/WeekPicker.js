import React, { useEffect, useState } from 'react'
import DatePicker from 'rsuite/DatePicker';
import moment from 'moment';
import 'rsuite/dist/rsuite.min.css';
import './WeekPicker.css';

export default function WeekPicker( {setValue_Week,value_Week_DD}) {

    const [objWeek, setObjWeek] = useState({
        date: new Date(),
        dateFrom: null,
        dateTo: null,
        weekNumber: null
    });

    const onChange = (date) => {
        const weekNumber = moment(date).isoWeek();
        // setValue_Week (moment(date).isoWeek())
        const dateFrom = moment(date).startOf('isoWeek').toDate();
        const dateTo = moment(date).endOf('isoWeek').toDate();

        setObjWeek({
            date,
            dateFrom,
            dateTo,
            weekNumber
        })
        setValue_Week((moment(date).isoWeek()).toString())        
    }
    const renderValue = (date) => {
        const weekNumber = moment(date).isoWeek();
        const year = moment(date).year();

        return `W${weekNumber}, ${year}`;
    }

  return (
    <div className='WeekPicker'>
        <DatePicker
            placeholder='Week picker'
            isoWeek
            showWeekNumbers
            value={objWeek.date}
            onChange={onChange}
            renderValue={renderValue}
        />

        {/* <div className='weekInfos'>
            <div>
                <span>Week Number : </span>
                <b>{objWeek.weekNumber}</b>
                {console.log(objWeek.weekNumber)}
            </div>
            <div>
                <span>Start of Week : </span>
                <b>{objWeek.dateFrom?.toDateString()}</b>
            </div>
            <div>
                <span>End of Week : </span>
                <b>{objWeek.dateTo?.toDateString()}</b>
            </div>
        </div> */}
    </div>
  )
}