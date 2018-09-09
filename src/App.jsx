import React, { Component } from 'react';
import ChessTable from './components/ChessTable';
import DeletedFigures from './components/DeletedFigures';
import TableStore from './stores/TableStore';
import * as TableActions from './actions/TableActions';
import SmartModal from './components/SmartModal';
import { Button } from 'reactstrap';

import './App.css';

class App extends Component {

    state = {
        loaded: false,
        newGameModal: false,
        isRotated: false
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

    newGame = () => {
        TableActions.newGame();
        this.newGameModalToggle();
    }

    newGameModalToggle = () => {
        this.setState({
            newGameModal: !this.state.newGameModal
        });
    }

    handleRotateTable = () => {
        this.setState({
            isRotated: !this.state.isRotated
        });
    }

    render() {
        return (
            <div>
                { !this.state.loaded ? 
                    <div className="loading"></div> 
                    :
                    <div className="container">
                        <div className={'row' + (this.state.isRotated ? ' rotated' : '')}>
                            <DeletedFigures color='white'></DeletedFigures>
                            <div className="col-8">
                                <ChessTable />
                            </div>
                            <DeletedFigures color='black'></DeletedFigures>
                        </div>
                        <div className="row">
                            <div className="col-12 buttons">
                                <Button color="secondary" onClick={this.newGameModalToggle}>New Game</Button>
                                <Button color="secondary" onClick={this.handleRotateTable}>Rotate Table</Button>
                            </div>
                        </div>
                    </div>
                }
                <SmartModal isOpen={this.state.newGameModal} title="New Game" onYes={this.newGame} onCancel={this.newGameModalToggle}>
                    <p className="text-center">Would you like to start a new game?</p>
                </SmartModal>
            </div>
        );
    }
}

export default App;
