import React, { Component } from 'react';
import ChessTable from './components/ChessTable';
import TableStore from './stores/TableStore';
import * as TableActions from './actions/TableActions';

import './App.css';

class App extends Component {

    state = {
        loaded: false
    }
    componentWillMount() {
        TableStore.on('change', this.handleTableLoaded);
    }

    handleTableLoaded = () => {
        TableStore.removeListener('change', this.handleTableLoaded);
        
        this.setState({
            loaded: true
        });
    }

    render() {
        return (
            <div>
                { !this.state.loaded ? 
                    <div className="loading"></div> 
                    :
                    <div className="container">
                        <div className="row">
                            <div className="col-2">
                            </div>
                            <div className="col-8">
                                <ChessTable />
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 buttons">
                                <button className="btn btn-secondary" onClick={ TableActions.newGame }>New Game</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default App;
