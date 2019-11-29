import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from './voteActionCreator';
import LoadingIndicator from '../../components/LoadingIndicator';

import './homePage.css';

const HomePage = ({ voteState, voteActions }) => {
    const { loading, questions, error } = voteState;

    useEffect(() => {
        voteActions.getQuestionList();
    }, []);

    return (
        <div className="home-page-container">
            {loading ? <LoadingIndicator /> : null}
            {!loading && error && <p>Something went wrong. We are looking into this issue. Please try again after some time.</p>}
            {(!loading && questions && questions.length)
                ? (
                    <div className="question-list">
                        {
                            questions.map(({ question }) => (
                                <p>{question}</p>
                            ))
                        }
                    </div>
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
