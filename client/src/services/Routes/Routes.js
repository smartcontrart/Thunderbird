import React from 'react';
import { Redirect, Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import WatchVideo from '../../scenes/WatchVideo.js';
import Browse from '../../scenes/Browse.js';
import About from '../../scenes/About.js';
import PublicRoute from './PublicRoute.js'
import Upload from '../../scenes/Upload.js';
import SignIn from '../../scenes/SignIn';
import Home from '../../scenes/Home';
import Collect from '../../scenes/Collect';


const Routes = () => {

    const Videos = () =>{
        return(
        <Switch>
            <Route path = '/videos/:id' component = {WatchVideo} />
        </Switch>
        )
    }

    return(
        <React.Fragment>
            <Switch>
                <PublicRoute exact path='/upload' component={Upload}/>
                <PublicRoute path='/videos' component={Videos}/>
                <PublicRoute exact path='/' component={Home}/>
                <PublicRoute exact path='/browse' component={Browse}/>
                <PublicRoute exact path='/about' component={About}/>
                <PublicRoute exact path='/login' component={SignIn}/>
                <PublicRoute exact path='/collect' component={Collect}/>
                <Redirect to="/404"/>
            </Switch>    
        </React.Fragment> 
    )
}

export default withRouter(Routes);