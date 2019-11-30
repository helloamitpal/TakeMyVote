import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from './voteActionCreator';
import ErrorMessage from '../../components/error';
import Grid from '../../components/grid';
import { formatDate } from '../../service/helper';
import config from '../../config';

import './homePage.css';

const HomePage = ({ voteState, voteActions, history }) => {
    const { loading, questions, error } = voteState;

    useEffect(() => {
        voteActions.getQuestionList();
    }, []);

    const onSelectCard = (evt, index) => {
        history.push({
            pathname: config.VOTING_PAGE,
            state: { selectedQuestionIndex: index }
        });
    };

    return (
        <div className="home-page-container">
            <ErrorMessage loading={loading} hasError={error} />
            {(!loading && questions && questions.length)
                ? (
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
