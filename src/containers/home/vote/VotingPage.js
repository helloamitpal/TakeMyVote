import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from '../voteActionCreator';
import LoadingIndicator from '../../../components/LoadingIndicator';

import './votingPage.css';

const VotingPage = ({ voteState, voteActions }) => {
    const { loading, questions, error } = voteState;

    return (
        <div className="voting-page-container">
            {loading ? <LoadingIndicator /> : null}
            {!loading && error && <p>Something went wrong. We are looking into this issue. Please try again after some time.</p>}
            {(!loading && questions && questions.length)
                ? (
                    <div className="">
                        hello
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
