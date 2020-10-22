import React from "react";
import { CloudRain, CloudSnow, Cloud, Sun } from "react-feather";

const findIcon = (param) => {
    switch (param) {
      case "Clouds":
        return <Cloud size={50} />;
        break;
      case "Rain":
        return <CloudRain size={50} />;
        break;
      case "Clear":
        return <Sun size={50} />;
        break;
      case "Snow":
        return <CloudSnow size={50} />;
        break;
      default:
        return <Sun size={50} />;
    }
  };
  
const formatTime = (timestamp, param1, param2) => {
    let dateObject = new Date(timestamp*1000);
    return dateObject.toLocaleString("en-US", { [param1]: param2 });
    /*
        dateObject.toLocaleString("en-US", {weekday: "long"}) // Monday
        dateObject.toLocaleString("en-US", {month: "long"}) // December
        dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
        dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
        dateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
        dateObject.toLocaleString("en-US", {minute: "numeric"}) // 30
        dateObject.toLocaleString("en-US", {second: "numeric"}) // 15
        dateObject.toLocaleString("en-US", {timeZoneName: "short"}) // 12/9/2019, 10:30:15 AM CST
        */
    };

export {findIcon, formatTime}