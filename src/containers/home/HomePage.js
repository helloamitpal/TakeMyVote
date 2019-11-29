import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from './voteActionCreator';

const HomePage = ({ voteState, voteActions }) => {
  const { loading, votes, error } = voteState;

  useEffect(() => {
    voteActions.getVotingList();
  }, []);

  return (
    <h1>Home</h1>
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
