import React, { Component } from 'react';
import TableStore from '../stores/TableStore';
import ChessField from './ChessField';
import '../styles/ChessTable.css';

class ChessTable extends Component {
    state = {
        table: TableStore.getTable(),
        selectedField: { row: -1, index: -1, figure: 'X' },
        isFigureMoving: false
    }

    componentWillMount() {
        TableStore.on('change', this.handleTableChanged);

        TableStore.on('selectedFieldChanged', this.handleSelectedFieldChanged);

        TableStore.on('figureMovingStart', () => {
            this.setState({
                isFigureMoving: true
            });
        });

        TableStore.on('figureMovingEnd', () => {
            this.setState({
                isFigureMoving: false
            });
        });

        TableStore.on('newAvailableFields', this.handleNewAvailableFields);
    }
    componentWillUnmount() {
        TableStore.removeListener('change', this.handleTableChanged);
        TableStore.removeListener('newAvailableFields', this.handleNewAvailableFields);
        TableStore.removeListener('selectedFieldChanged', this.handleSelectedFieldChanged);
    }
    
    handleTableChanged = () => {
        this.setState({
            table: TableStore.getTable()
        });
    }

    handleNewAvailableFields = (availableFields) => {
        console.log(availableFields)
    }        

    handleSelectedFieldChanged = (field) => {
        this.setState({
            selectedField: field
        });
    }

    getSelectedField = () => {
        return this.state.selectedField;
    }

    isFigureMoving = () => {
        return this.state.isFigureMoving;
    }

    render() { 
        return ( 
            <div className="chess-table clearfix">
                { 
                    this.state.table.map( (row, rowIndex) => { 
                        return row.split('').map((figure, index) => 
                            <ChessField figure={ figure } row={ rowIndex } index={ index + 1 } getSelectedField={ this.getSelectedField }
                                isFigureMoving={ this.isFigureMoving } key={ rowIndex + ' ' + index } />)
                    }) 
                }
            </div> 
        );
    }
}
 
export default ChessTable;