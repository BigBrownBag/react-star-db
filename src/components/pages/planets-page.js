import  React,{ Component } from 'react';

import ErrorIndicator from '../error-indicator';
import Row from '../row/row';
import  {PlanetList,PlanetDetails} from '../sw-components';

export default class PlanetsPage extends Component {

    state = {
        selectedPerson: null,
        hasError: false
    };

    onPersonSelected = (id) => {
        this.setState({
          selectedPerson: id,
        });
    };;

    componentDidCatch() {
        this.setState({hasError: true});
    };

    render() {
        if (this.state.hasError) {return <ErrorIndicator />}
        const personList = (
        <PlanetList onItemSelected={this.onPersonSelected} />
        );
        const personDetails = <PlanetDetails itemId={this.state.selectedPerson}/>;
        return(
            <Row left={personList} right={personDetails}/>
        )
    };
};