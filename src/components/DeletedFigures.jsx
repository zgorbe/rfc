import React, { Component } from 'react';
import DeletedFiguresStore from '../stores/DeletedFiguresStore';
import '../styles/DeletedFigures.css';

class DeletedFigures extends Component {
    state = {
        deletedWhites: DeletedFiguresStore.getDeletedWhites(),
        deletedBlacks: DeletedFiguresStore.getDeletedBlacks()
    }

    componentWillMount() {
        DeletedFiguresStore.on(this.props.color + 'FigureDeleted', this.handleDeletedFigureChange);
    }

    componentWillUnmount() {
        DeletedFiguresStore.removeListener(this.props.color + 'FigureDeleted', this.handleDeletedFigureChange);
    }

    handleDeletedFigureChange = (deletedFigures) => {
        this.setState({
            [this.props.color === 'white' ? 'deletedWhites' : 'deletedBlacks']: deletedFigures
        });
    }

    getDeletedFigures = () => {
        return this.props.color === 'black' ? this.state.deletedBlacks : this.state.deletedWhites;
    }

    getCssClass(figure) {
        return (figure.toUpperCase() === figure ? 'v' : 'f') + figure.toLowerCase();
    }

    render() { 
        return (
            <div className={'figure-container col-2 ' + this.props.color}>
            {
                this.getDeletedFigures().map((figure, index) => {
                    return <div className={`figure ${this.getCssClass(figure)}`} key={index}></div>
                })              
            }
            </div>
        );
    }
}
 

export default DeletedFigures;