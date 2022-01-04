import React from 'react'
import { SearchEmbed } from '@thoughtspot/visual-embed-sdk/react';


export default function Search() {
   return (
       <div>
           <h1>Search</h1>
           <p>
            This Search uses the Sample Retail - Apparel datasource which comes with the ThoughtSpot Free Trial account. 
            You can also use the <a href="https://try.thoughtspot.cloud/#/develop/playground/search" target="_blank">Developer Playground</a> to configure additional parameters. 
           </p>
           <p>&nbsp;</p>
           <SearchEmbed frameParams={{hideDataSources: "true", height: "80vw"}} dataSources={"cd252e5c-b552-49a8-821d-3eadaa049cca"}/>
       </div>
   )
}