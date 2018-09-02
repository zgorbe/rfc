import dispatcher from '../dispatcher';
import ActionTypes from './ActionTypes';

export function moveFigure(sourceField, targetField) {
    dispatcher.dispatch({
        type: ActionTypes.FIGURE_MOVING,
        sourceField: sourceField,
        targetField: targetField
    });
}

export function selectField(field) {
    dispatcher.dispatch({
        type: ActionTypes.SELECT_FIELD,
        field: field
    });
}

export function newGame() {
    dispatcher.dispatch({
        type: ActionTypes.NEW_GAME
    });
}