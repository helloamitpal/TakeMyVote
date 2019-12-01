import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from '../voteActionCreator';
import ErrorMessage from '../../../components/error';
import { formatDate } from '../../../service/helper';
import config from '../../../config';
import Button from '../../../components/button';
import Choice from './Choice';

import './votingPage.css';

const VotingPage = ({ voteState, voteActions, location, history }) => {
    const { loading, questionDetails, error, voted } = voteState;
    const { state: { selectedQuestion } } = location;
    const [selectedVote, setSelectedVote] = useState('');
    const { question, published_at, choices } = questionDetails || {};

    // calling the details API to get the question details
    useEffect(() => {
        voteActions.getQuestionDetails(selectedQuestion);
    }, [voted]);

    // calling the API to vote for selected choice of respective question
    const saveVote = (evt) => {
        evt.stopPropagation();
        const data = choices.filter(({ url }) => (url === selectedVote));

        if (!data) {
            return;
        }

        const { votePercentage, ...payload } = data[0];

        voteActions.castVote(selectedVote, payload);
    };

    // going back to the home page
    const backToPreviousPage = (evt) => {
        evt.stopPropagation();
        history.push(config.HOME_PAGE);
    };

    // updating state for the selected choice
    const selectVote = (evt, url) => {
        evt.stopPropagation();
        setSelectedVote(url);
    };

    return (
        <div className="voting-page-container">
            <h1>Question Details</h1>
            <ErrorMessage loading={loading} hasError={error} message={error} />

            {(!error && selectedQuestion && questionDetails && choices && choices.length === 0)
                ? (
                    <Fragment>
                        <p>No choices found</p>
                        <Button onClick={backToPreviousPage} label="Back" />
                    </Fragment>
                )
                : null
            }

            {(!error && selectedQuestion && questionDetails && choices && choices.length > 0)
                ? (
                    <div className="details">
                        <h3 className="header">{`Question: ${question}`}</h3>
                        <section>{`Published on ${formatDate(published_at)}`}</section>
                        <ul className="options-container">
                            {
                                choices.map(({ choice, votes, url, votePercentage }) => (
                                    <Choice
                                        key={`choice${url.split('/').join('-')}`}
                                        details={{
                                            selectedVote,
                                            choice,
                                            votes,
                                            votePercentage,
                                            url,
                                            voted,
                                            selectVote
                                        }}
                                    />
                                ))
                            }
                        </ul>
                        <div className="button-section">
                            <Button onClick={backToPreviousPage} label="Back" />
                            <Button onClick={saveVote} primary disabled={!selectedVote || voted} label="Save Vote" />
                        </div>
                    </div>
                )
                : null
            }
        </div>
    );
};

VotingPage.propTypes = {
    voteState: PropTypes.object,
    voteActions: PropTypes.object
};

const mapStateToProps = (state) => ({
    voteState: state.vote
});

const mapDispatchToProps = (dispatch) => ({
    voteActions: bindActionCreators(voteActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VotingPage);
