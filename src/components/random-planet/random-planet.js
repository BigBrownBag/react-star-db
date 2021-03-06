import React, { Component } from 'react';
import './random-planet.css';
import SwapiService from './../../services/api';
import Spinner from './../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {
    swapiService = new SwapiService();

    static defaultProps = {
        updateInterval: 10000
    };

    static propTypes = {
        updateInterval: (props,propName,component)=>{
            const value = props[propName];
            if (typeof value === 'number' && !isNaN(value)) {
                return null
            }
            return new TypeError(`${component}: ${propName} must be a number`);
        }
    }

    state = {
        planet: {},
        loading: true,
        error: false,
    };

    componentDidMount() {
        const {updateInterval} = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
        //clearInterval(this.interval);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false});
    };

    onError = (err) => {
        this.setState({error: true, loading: false});
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random()*25)+3;
        this.swapiService.getPlanet(id).then(this.onPlanetLoaded).catch(this.onError);
    };

    render() {
        const {planet, loading, error} = this.state;
        const errorMes = error ? <ErrorIndicator />:null;
        const spinner = loading ? <Spinner />:null;
        const content = !(loading || error ) ? <PlannetView planet={planet}/>:null;
        return (
            <div className="random-planet jumbotron rounded">
                {errorMes}
                {spinner}
                {content}
            </div>
        )
    };
};

const PlannetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet;
    return (
        <React.Fragment>
            <img className="planet-image"
                    src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt={name}/>
                <div>
                <h4>{ name }</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                    <span className="term">Population</span>
                    <span>{ population }</span>
                    </li>
                    <li className="list-group-item">
                    <span className="term">Rotation Period</span>
                    <span>{ rotationPeriod }</span>
                    </li>
                    <li className="list-group-item">
                    <span className="term">Diameter</span>
                    <span>{ diameter }</span>
                    </li>
                </ul>
                </div>
        </React.Fragment>
    )
};