import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import Header from "../components/Header";
import { Triangle } from  'react-loader-spinner'
import  {setUser} from '../app/User/UserSlice'
import { useDispatch } from "react-redux";
const Dashboard = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const dispatch=useDispatch(); 
  useEffect(() => {
    if(userInfo){
      dispatch(setUser(userInfo)) 
      return
    }
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        console.log(userInfo)
       
      });
      
    }
  }, [authState, dispatch, oktaAuth, userInfo]); // Update if authState changes

  

  if (!userInfo) {
    return (
      <div style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: '2rem' }}>
        <Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
        <p>
          loading User Info
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <div style={{ padding: "1rem ", width: '60%', margin: 'auto',maxWidth:'100%' }}>
       
        <div style={{ background: '#c4fff9', height: '1rem',color:'#246a73', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 10rem', borderRadius: '.5rem' }}>
          <b style={{color:'#246a73'}} >
            Claim
          </b>
          <b style={{color:'#246a73'}}>
            Value
          </b>
        </div>

        {Object.entries(userInfo).map((claimEntry) => {
          const claimName = claimEntry[0];
          const claimValue = claimEntry[1];
          const claimId = `claim-${claimName}`;
          return (<div key={claimName} style={{ background: '#e9fffc',border:'2px solid #c4fff9', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 10rem', borderRadius: '.5rem',color:'red', margin: '.5rem 0' }}>
            <p style={{color:'#246a73',fontWeight:"600"}}>
              {claimName}
            </p>
            <p id={claimId} style={{color:'#246a73',fontWeight:"600"}}>
              {claimValue.toString()}
            </p>
          </div>

          );
        })}
        {/* <button onClick={()=>
      dispatch(setUser(userInfo)) }>
          Save State
        </button> */}

      </div>

    </div>
  );
};

export default Dashboard;