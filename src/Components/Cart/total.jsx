import React, { useState } from "react";
import { useStore } from "react-redux";

const total = ({counter}) =>{
    let [count,SetCount] = useState(0);
    SetCount(counter);
    return(
        <div>

        </div>
    )
}
export default total;