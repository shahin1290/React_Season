import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'


class App extends React.Component{
    state = { lat: null, errorMessage: ''} 

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position)=> this.setState({ lat: position.coords.latitude}),
            (err)=> this.setState({errorMessage: err.message})
        )
    }

    renderContent(){
        const {lat} = this.state
        const {errorMessage} = this.state
        if(!lat && errorMessage){
            return <div>{errorMessage}</div>
        }else if(lat && !errorMessage){
            return <SeasonDisplay lat={lat} />
        }else {
            return <Spinner message="Please accept location request" />
        }
    }

    render(){
        
        return (
            <div>
                { this.renderContent() }
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))