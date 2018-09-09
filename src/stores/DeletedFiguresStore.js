import { EventEmitter } from 'events';
import { deletedWhitesRef } from '../firebase';
import { deletedBlacksRef } from '../firebase';

class DeletedFiguresStore extends EventEmitter {
    deletedWhites = []
    deletedBlacks = []
    firebaseEventConfig = {
        white: {
            ref: deletedWhitesRef,
            event: 'whiteFigureDeleted',
            array: this.deletedWhites
        },
        black: {
            ref: deletedBlacksRef,
            event: 'blackFigureDeleted',
            array: this.deletedblacks
        }
    }
    constructor() {
        super();

        for (const [, config] of Object.entries(this.firebaseEventConfig)) {
            config.ref.on('value', snapshot => {
                let obj = snapshot.val() || {}; 
    
                config.array = Object.keys(obj).map((key) => {
                    return obj[key];
                });
                this.emit(config.event, config.array);
            });
        }
    }

    getDeletedWhites = () => {
        return this.deletedWhites;
    }

    getDeletedBlacks = () => {
        return this.deletedBlacks;
    }
}
const deletedFiguresStore = new DeletedFiguresStore();

export default deletedFiguresStore;