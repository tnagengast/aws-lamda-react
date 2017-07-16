import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNote } from '../actions/index'
import { bindActionCreators } from 'redux'

class NoteList extends Component {

    renderList() {
        return this.props.notes.map((note) => {
            return (
                <li key={ note.title }
                    onClick={ () => this.props.getNote(note) }
                    className="list-group-item">
                    { note.title }
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="list-group col-sm-4">
                { this.renderList() }
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.notes
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getNote: getNote }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteList)
