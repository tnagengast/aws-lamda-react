import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PageHeader, ListGroup, ListGroupItem, } from 'react-bootstrap'
// import * as actions from '../actions';
import { notesIndex } from '../actions';
import '../styles/css/Home.css'

function isEmpty(obj) {
    for ( let key in obj ) {
        if (obj.hasOwnProperty(key) )
            return false;
    }
    return true;
}

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = { isLoading: false }
    }

    async componentDidMount() {
        if ( ! this.props.userToken) {
            return
        }

        this.setState({ isLoading: true })

        try {
            await this.props.notesIndex(this.props.userToken) // TODO This is broken...
        }
        catch(e) {
            console.error('Failed to fetch notes in Home container: ' + e)
        }

        this.setState({ isLoading: false })
    }

    renderNotesList(notes) {
        /*
            TODO render the array of note objects correctly
         */
        
        return isEmpty(notes) ?
                <ListGroupItem
                    key="new"
                    href="/notes/new"
                    onClick={this.handleNoteClick}>
                    <h4><b>{'\uFF0B'}</b> Create a new note</h4>
                </ListGroupItem>
            : [{}].concat(notes).map((note, i) => (
                <ListGroupItem
                    key={note[0].noteId}
                    href={`/notes/${note[0].note_id}`}
                    onClick={this.handleNoteClick}
                    header={note[0].content.trim().split('\n')[0]}>
                    { "Created: " + (new Date(note[0].created_at)).toLocaleString() }
                </ListGroupItem>))
    }

    handleNoteClick = (event) => {
        event.preventDefault()
        this.props.history.push(event.currentTarget.getAttribute('href'))
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>Riptide Notes</h1>
                <p>A simple note taking app</p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">Login</Link>
                    <Link to="/signup" className="btn btn-success btn-lg">Signup</Link>
                </div>
            </div>
        )
    }

    renderNotes() {
        return (
            <div className="notes">
                <PageHeader>Your Riptide Notes</PageHeader>
                <ListGroup>
                    { ! this.state.isLoading && this.renderNotesList(this.props.notes) }
                </ListGroup>
            </div>
        )
    }

    render() {
        return (
            <div className="Home">
                { this.props.userToken ? this.renderNotes() : this.renderLander() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userToken: state.userToken,
        notes: state.notes,
    }
}

export default withRouter(
    // connect(mapStateToProps, actions)(Home)
    connect(mapStateToProps, { notesIndex })(Home)
)
