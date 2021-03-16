import React, { Component } from 'react';
import './app.css';

import Header from './../header';
import RandomPlanet from './../random-planet';
import {PeoplePage, StarshipPage, PlanetsPage} from '../pages';
import {SwapiServiceProvider} from './../swapi-service-context';
import SwapiService from './../../services/api';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {
    swapiService = new SwapiService();
    render() {
        return (
            <SwapiServiceProvider value={this.swapiService}>
                <BrowserRouter>
                    <div className='stardb-app'>
                        <Header />
                        <RandomPlanet />
                        <Switch>
                            <Route path='/' exact render={()=><h2>Welcome to Star DB</h2>}/>
                            <Route path='/people/:id?' component={PeoplePage}/>
                            <Route path='/planets' component={PlanetsPage}/>
                            <Route path='/starships' exact component={StarshipPage}/>
                            <Route path='/starships/:id' render={({match})=>{
                                const {id} = match.params;
                                return <StarshipDetails itemId={id} />
                            }}/>
                            <Route render={()=><h2>Page not found</h2>}/>
                        </Switch>
                    </div>
                </BrowserRouter>       
            </SwapiServiceProvider> 
        );
    };
};