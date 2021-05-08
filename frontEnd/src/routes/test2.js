import React from 'react';
import { useHistory } from 'react-router';


function Test2Component() {
  

 
const history=useHistory();

    return (
     <div style={{backgroundColor:"red"}}>
         <h2>heloo**mmmmmmmmmmmmmmmmmmmmmmkugkgkugggggggggg</h2>
         <button onClick={()=>{console.log("yesss");history.push("/test1")}}> TEST1</button>
         <button onClick={()=>{console.log("yesss");history.push("/test2")}}> TEST2</button>
         <button onClick={()=>{console.log("yesss");history.push("/studyList")}}> liste</button>
       

         
     </div>
    );
  
}


export default Test2Component;
