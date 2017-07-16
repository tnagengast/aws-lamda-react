import React, { Component } from 'react'
import { connect } from 'react-redux'

class NoteDetail extends Component {

    render() {
        if ( ! this.props.activeNote) {
            return (<div>Select a note to view</div>)
        }

        return (
            <div>
                <h3>Details for:</h3>
                <div>Title: { this.props.activeNote.title }</div>
                <div>Size: { this.props.activeNote.size }</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeNote: state.activeNote
    };
}

export default connect(
    mapStateToProps
)(NoteDetail)
