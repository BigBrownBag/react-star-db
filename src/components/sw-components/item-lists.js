import React from 'react';
import ItemList from './../item-list';
import {withData, withSwapiService} from './../hoc-helpers';

const mapPersonMethodsToProps = (swapiService) => {
    return {getData: swapiService.getAllPeople}
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {getData: swapiService.getAllPlanets}
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {getData: swapiService.getAllStarships}
};

const withChildComponent = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    };
};

const ListWithChildren = withChildComponent(ItemList, ({name}) => <span>{name}</span> );

const PersonList = withSwapiService(withData(ListWithChildren),mapPersonMethodsToProps);

const PlanetList = withSwapiService(withData(ListWithChildren), mapPlanetMethodsToProps);

const StarshipList = withSwapiService(withData(withChildComponent(ItemList, ({name, model}) => <span>{name} ({model})</span> )), mapStarshipMethodsToProps);

export {PersonList, PlanetList, StarshipList};