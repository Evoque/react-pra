
import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
    constructor() {
        // bindActions => map each action to method by name.
        this.bindActions(NoteActions);

        this.notes = [];

        this.exportPublicMethods({
          getNotesByIds: this.getNotesByIds.bind(this)
        });
    }

    create(note) {
        note.id = uuid.v4();

        this.setState({
            notes: this.notes.concat(note)
        });

        return note;
    }

    update(updatedNote) {
        const notes = this.notes.map(note => {
            if (note.id === updatedNote.id) {
                return Object.assign({}, note, updatedNote);
            }
            return note;
        });

        this.setState({
            notes
        });
    }

    delete(id) {
        this.setState({
            notes: this.notes.filter(note => note.id !== id)
        });
    }

    getNotesByIds(ids) {
        // console.log("查询的id: " + ids);
        var a = (ids || []).map(id => this.notes.filter(note => note.id === id));
        // console.log("筛选出的ID: " + a);
        var b = a.filter(a => a.length);
        // console.log('a=> a.length :' + b);
        var d = b.map(a => a[0]);
        // console.log("result: " + b);
        return (ids || []).map(id => this.notes.filter(note => note.id === id))
                          .filter(a => a.length)
                          .map(a => a[0]);
    }

}


export default alt.createStore(NoteStore, 'NoteStore');
// it protects the code against minification. These labels become important when
// we persist the data.
