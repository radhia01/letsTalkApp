import React from 'react';
import { Redirect,Route } from 'react-router-dom';
const Privateroute = ({auth,component:Component,...rest}) => {
    return (
      <Route
            {...rest}
            render={(props)=>{
                if(auth) return <Component {...props} />;
                if(!auth)
                return(<Redirect  to={{path:"/",state:{from:props.location} }}/>)
            }
            }>
      </Route>
    );
}

export default Privateroute;
