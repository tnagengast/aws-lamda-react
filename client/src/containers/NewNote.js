import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config.js';
import '../styles/css/NewNote.css';
import { invoke, s3Upload } from '../aws';
import { connect } from 'react-redux'
import * as actions from '../actions';

/*
    TODO move to redux-form
    TODO implement actions
 */


class NewNote extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            content: '',
        };
    }

    componentDidMount() {
        // console.log(this.props.userToken); // TODO remove console.log

    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleFileChange = (event) => {
        this.file = event.target.files[0];
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert('Please pick a file smaller than 5MB');
            return;
        }

        this.setState({ isLoading: true });

        try {
            let uploadedFilename = (this.file)
                ? (await s3Upload(this.file, this.props.userToken)).Location
                : null;

            await this.createNote({
                content: this.state.content,
                attachment: uploadedFilename,
            });

            this.props.history.push('/');
        }
        catch(e) {
            console.log(e); // TODO handle error

            this.setState({ isLoading: false });
        }
    }

    createNote(note) {
        return invoke({
            url: '/notes',
            method: 'POST',
            data: note,
        }, this.props.userToken);
    }

    render() {
        return (
            <div className="NewNote">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.content}
                            componentClass="textarea" />
                    </FormGroup>
                    <FormGroup controlId="file">
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl
                            onChange={this.handleFileChange}
                            type="file" />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create"
                        loadingText="Creating…" />
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userToken: state.userToken,
    }
}

export default withRouter(
    connect(mapStateToProps, actions)(NewNote)
)
