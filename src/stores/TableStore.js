import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

import ActionTypes from '../actions/ActionTypes';
import { tableRef } from '../firebase';
import { deletedWhitesRef } from '../firebase';
import { deletedBlacksRef } from '../firebase';
import { whoIsNextRef } from '../firebase';
import { castlingRef } from '../firebase';
import { lastMoveRef } from '../firebase';
import { checkRef } from '../firebase';
import { mateRef } from '../firebase';
import { drawRef } from '../firebase';

import utils from '../utils';

class TableStore extends EventEmitter {
    table = []
    lastMove
    constructor() {
        super();

        tableRef.on('value', snapshot => {
            this.table = snapshot.val();

            this.emit('change');
        });
      
        lastMoveRef.on('value', snapshot => {
            this.lastMove = snapshot.val();
        });
    }

    getTable() {
        return this.table;
    }

    handleFigureMove = (sourceField, targetField) => {
        this.emit('figureMovingStart');

        tableRef.once('value', snapshot => {
            let tableData = snapshot.val();

            var isUpdateInSameRow = sourceField.row === targetField.row,
                sourceRow = tableData[sourceField.row],
                figureToMove = sourceRow.charAt(sourceField.index - 1),
                updatedSourceRow = utils.stringReplaceAt(sourceRow, 'X', sourceField.index - 1),
                targetRow = isUpdateInSameRow ? updatedSourceRow : tableData[targetField.row],
                updatedTargetRow = utils.stringReplaceAt(targetRow, figureToMove, targetField.index - 1);

            Promise.all([
                isUpdateInSameRow ? Promise.resolve() : tableRef.child(sourceField.row).set(updatedSourceRow),
                tableRef.child(targetField.row).set(updatedTargetRow)
            ]).then(() => {
                this.clearSelectedField();

                // delete a figure
                if (targetField.figure !== 'X') {
                    if (utils.getFigureColor(targetField.figure) === 'black') {
                        deletedBlacksRef.push(targetField.figure);
                    } else {
                        deletedWhitesRef.push(targetField.figure);
                    }
                }

                lastMoveRef.set([sourceField, targetField]);

                this.emit('figureMovingEnd');
            });
        });
    }

    handleNewGame = () => {
        tableRef.update({
            0: 'bhfvkfhb',
            1: 'pppppppp',
            2: 'XXXXXXXX',
            3: 'XXXXXXXX',
            4: 'XXXXXXXX',
            5: 'XXXXXXXX',
            6: 'PPPPPPPP',
            7: 'BHFVKFHB'
        });
        
        this.clearSelectedField();

        deletedBlacksRef.set({});
        deletedWhitesRef.set({});
        
        whoIsNextRef.set('white');
        
        castlingRef.set({
            black: {
                isKingMoved: false,
                rookMoves: []
            },
            white: {
                isKingMoved: false,
                rookMoves: []
            }
        });
        
        lastMoveRef.set([]);

        checkRef.set(false);
        mateRef.set(false);
        drawRef.set(false);
    }

    clearSelectedField = () => {
        this.emit('selectedFieldChanged', { row: -1, index: -1, figure: 'X' });
    }

    handleSelectField = (field) => {
        // do selection
        this.emit('selectedFieldChanged', field);
    }

    handleActions = (action) => {
        console.log('TableStore received action', action);
        switch(action.type) {
            case ActionTypes.SELECT_FIELD: {
                this.handleSelectField(action.field);
                break;
            }
            case ActionTypes.FIGURE_MOVING: {
                this.handleFigureMove(action.sourceField, action.targetField);
                break;
            }
            case ActionTypes.NEW_GAME: {
                this.handleNewGame();
                break;
            }            
            default: break;
        }
    }
}
const tableStore = new TableStore();

dispatcher.register(tableStore.handleActions);

export default tableStore;