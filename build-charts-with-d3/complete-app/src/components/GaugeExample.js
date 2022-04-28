import React, { useEffect, useRef, useState } from 'react';
import { GaugeChart } from './utils/GaugeChart'
import { getSearchData, tsLogin } from './utils/thoughtspot-rest-api-v1-helpers';


const tsURL = process.env.REACT_APP_TS_URL;
const USER = process.env.REACT_APP_TS_USERNAME;
const PASSWORD = process.env.REACT_APP_TS_PASSWORD;

const worksheetID = "cd252e5c-b552-49a8-821d-3eadaa049cca";
const search1 = "[sales] [item type] top 1"; //Most sold item

export default function GaugeExample(props) {
//Use React Hooks to handle state
const svg = useRef(null);
const [value, setValue] = useState(null);
const [cfg, setCfg] = useState(null);

//Use React Hooks to handle state
useEffect(() => {

    const fetchData = async () => {
        
        const responseLogin = await tsLogin(tsURL, USER, PASSWORD);
        const responseSearch1 = await getSearchData(tsURL, worksheetID, search1);
        const apiData1 = await responseSearch1.data; // Get only the data portion of the response

        var cfg = {
            label: "Sales",
            gaugeMaxValue: 100,
            units: "M"
            };
        //Pull name of the most sold item from API
        cfg.label = "Total " + apiData1[0][0] + ' sales ';

        setCfg(cfg);
        setValue( Math.round(apiData1[0][1]/1000000) ); 
    };

    fetchData();

}, []);

if (value) {
        return (
               <div className="chart-gauge">  
                    <h1>Gauge Radar</h1>
                    <GaugeChart value={value} cfg={cfg}/>
                </div>
                );
    }
    else {
        return <div> Loading chart data... </div>;
    }
}
