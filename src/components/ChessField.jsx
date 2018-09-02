import React, { Component } from 'react';
import * as TableActions from '../actions/TableActions';

class ChessField extends Component {
    state = { 
        selected: false,
        available: false
    }

    selectFigure = () => {
        if (this.props.isFigureMoving()) {
            return;
        }

        let selectedField = this.props.getSelectedField(),
            currentField = {
                row: this.props.row,
                index: this.props.index,
                figure: this.props.figure
            };

        if (selectedField.figure !== 'X') {
            TableActions.moveFigure(selectedField, currentField);
        } else if (currentField.figure !== 'X') {
            TableActions.selectField(currentField);

            this.setState({
                selected: true
            });
        }
    }

    getCssClass = () => {
        const figure = this.props.figure, 
            cssClassPrefix = figure.toUpperCase() === figure ? 'v' : 'f',
            selectedField = this.props.getSelectedField(),
            selectedClass = selectedField.row === this.props.row && selectedField.index === this.props.index ? 'selected' : '';

        return figure.toUpperCase() === 'X' ? '' : ' ' + cssClassPrefix + figure.toLowerCase() + ' ' + selectedClass;
    }

    render() { 
        return ( 
            <div className={`field${this.getCssClass()}`} onClick={ this.selectFigure } /> 
        );
    }
}
 

export default ChessField;