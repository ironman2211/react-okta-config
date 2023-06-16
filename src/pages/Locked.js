import React from 'react'

import Header from "../components/Header.js";
export default function Locked() {
  return (
    <div>
      <Header></Header>
      <div style={{padding:"1rem"}}>
<h1>
  I am Locked 🔒..... 
</h1>
<p>
  If You are able to watch this that means you are authenticated ⚡
</p>
      </div>
    </div>
  )
}
