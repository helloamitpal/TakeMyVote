import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from '../voteActionCreator';
import ErrorMessage from '../../../components/error';
import { formatDate } from '../../../service/helper';
import config from '../../../config';
import Button from '../../../components/button';

import './votingPage.css';

const VotingPage = ({ voteState, voteActions, location, history }) => {
    const { loading, questions, error } = voteState;
    const { state: { selectedQuestionIndex } } = location;
    const { question, published_at, url, choices } = questions[selectedQuestionIndex];

    const saveVote = (evt) => {
        evt.stopPropagation();
    };

    const backToPreviousPage = (evt) => {
        evt.stopPropagation();
        history.push(config.HOME_PAGE);
    };

    return (
        <div className="voting-page-container">
            <h1>Question Details</h1>
            <ErrorMessage loading={loading} hasError={error} />
            {(!loading && selectedQuestionIndex && questions && questions.length)
                ? (
                    <div className="details">
                        <h3 className="header">{`Question: ${question}`}</h3>
                        <section>{`Published on ${formatDate(published_at)}`}</section>
                        <ul className="options-container">
                            {
                                choices.map(({ choice, votes, url, votePercentage }) => (
                                    <li key={`choice${url.split('/').join('-')}`}>
                                        <div>{choice}</div>
                                        <div className="center">{`${votes} votes`}</div>
                                        <div className="center">{`${votePercentage}%`}</div>
                                        <div className="center">
                                            <Button onClick={saveVote} primary label="Vote" />
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="button-section">
                            <Button onClick={backToPreviousPage} label="Back" />
                            <Button onClick={saveVote} primary label="Save Vote" />
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
