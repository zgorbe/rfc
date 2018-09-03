import React, { Component } from 'react';
import ChessTable from './components/ChessTable';
import TableStore from './stores/TableStore';
import * as TableActions from './actions/TableActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './App.css';

class App extends Component {

    state = {
        loaded: false,
        newGameModal: false
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
        this.modalToggle({
            target: {
                dataset: {
                    modal: 'newGameModal'
                }
            }
        });
    }

    modalToggle = (e) => {
        var modal = e.target.dataset.modal;
        this.setState({
            [modal]: !this.state[modal]
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
                                <Button data-modal="newGameModal" color="secondary" onClick={this.modalToggle}>New Game</Button>
                            </div>
                        </div>
                    </div>
                }
                <Modal isOpen={this.state.newGameModal}>
                    <ModalHeader>New Game</ModalHeader>
                    <ModalBody>
                        <p className="text-center">Would you like to start a new game?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button data-modal="newGameModal" color="primary" onClick={this.modalToggle}>No</Button>
                        <Button color="secondary" onClick={this.newGame}>Yes</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default App;
