import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from './voteActionCreator';
import ErrorMessage from '../../components/error';
import Grid from '../../components/grid';
import { formatDate } from '../../service/helper';
import Button from '../../components/button';
import config from '../../config';

import './homePage.css';

const HomePage = ({ voteState, voteActions, history }) => {
    const { loading, questions, error } = voteState;

    useEffect(() => {
        voteActions.getQuestionList();
    }, []);

    const onSelectCard = (evt, index) => {
        evt.stopPropagation();
        history.push({
            pathname: config.VOTING_PAGE,
            state: { selectedQuestion: questions[index].url }
        });
    };

    const createVote = (evt) => {
        evt.stopPropagation();
        history.push(config.CREATE_VOTE_PAGE);
    };

    return (
        <div className="home-page-container">
            <ErrorMessage loading={loading} hasError={error} message={error} />
            {(!loading && !error && questions && questions.length)
                ? (
                    <Fragment>
                        <Button className="create-vote-btn" label="Create Vote" primary onClick={createVote} />
                        <Grid onSelectCard={onSelectCard}>
                            {
                                questions.map(({ question, published_at, url, choices }) => (
                                    <div className="question-container" key={`question${url.split('/').join('-')}`}>
                                        <h1>{question}</h1>
                                        <section>{`Published on ${formatDate(published_at)}`}</section>
                                        <section>{`${choices.length} choices`}</section>
                                    </div>
                                ))
                            }
                        </Grid>
                    </Fragment>
                )
                : null
            }
        </div>
    );
};

HomePage.propTypes = {
    voteState: PropTypes.object,
    voteActions: PropTypes.object
};

const mapStateToProps = (state) => ({
    voteState: state.vote
});

const mapDispatchToProps = (dispatch) => ({
    voteActions: bindActionCreators(voteActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
