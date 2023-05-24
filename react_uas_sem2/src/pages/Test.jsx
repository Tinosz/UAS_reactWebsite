import React from "react";
import { useLocation } from "react-router-dom";

function Test() {
    const location = useLocation();
    const { thumbnailUrl, key } = location.state;
  
    console.log("Modified Thumbnail URL:", thumbnailUrl);
    console.log("Key:", key);

  return (
    <div>
      <h1>This is the test Page. Check console to see the data sent</h1>
    </div>
  );
}

export default Test;