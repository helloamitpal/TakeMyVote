import React, { useState, useEffect } from 'react';
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
    const { loading, questionDetails, error, voted } = voteState;
    const { state: { selectedQuestion } } = location;
    const [selectedVote, setSelectedVote] = useState('');
    const { question, published_at, url, choices } = questionDetails || {};

    useEffect(() => {
        voteActions.getQuestionDetails(selectedQuestion);
    }, []);

    const saveVote = (evt) => {
        evt.stopPropagation();
        const data = choices.filter(({ url }) => (url === selectedVote));

        if (!data) {
            return;
        }

        const { votePercentage, ...payload } = data[0];

        voteActions.castVote(selectedVote, payload);
    };

    const backToPreviousPage = (evt) => {
        evt.stopPropagation();
        history.push(config.HOME_PAGE);
    };

    const selectVote = (evt, url) => {
        evt.stopPropagation();
        setSelectedVote(url);
    };

    return (
        <div className="voting-page-container">
            <h1>Question Details</h1>
            <ErrorMessage loading={loading} hasError={error} />
            {(!loading && !error && selectedQuestion && questionDetails && choices)
                ? (
                    <div className="details">
                        <h3 className="header">{`Question: ${question}`}</h3>
                        <section>{`Published on ${formatDate(published_at)}`}</section>
                        <ul className="options-container">
                            {
                                choices.map(({ choice, votes, url, votePercentage }) => (
                                    <li key={`choice${url.split('/').join('-')}`} className={selectedVote === url ? 'voted' : ''}>
                                        <div>{choice}</div>
                                        <div className="center">{`${votes} votes`}</div>
                                        <div className="center">{`${votePercentage}%`}</div>
                                        <div className="center">
                                            <Button onClick={(evt) => selectVote(evt, url)} disabled={voted || selectedVote === url} primary label={selectedVote === url ? 'Voted' : 'Vote'} />
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="button-section">
                            <Button onClick={backToPreviousPage} label="Back" />
                            <Button onClick={saveVote} primary disabled={voted} label="Save Vote" />
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
