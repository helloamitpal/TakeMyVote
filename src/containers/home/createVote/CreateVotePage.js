import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from '../voteActionCreator';
import Button from '../../../components/button';
import config from '../../../config';

import './createVotePage.css';

const CreateVotePage = ({ voteState, voteActions, history }) => {
    const { loading, questions, error } = voteState;

    const createVote = () => {

    };

    return (
        <form className="create-vote-page-container">
            <label for="question">
                Question
                <input type="text" name="question" />
            </label>
            <Button label="Submit" onClick={createVote} />
        </form>
    );
};

CreateVotePage.propTypes = {
    voteState: PropTypes.object,
    voteActions: PropTypes.object
};

const mapStateToProps = (state) => ({
    voteState: state.vote
});

const mapDispatchToProps = (dispatch) => ({
    voteActions: bindActionCreators(voteActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateVotePage);
