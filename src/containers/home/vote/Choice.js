import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';

// Added React memo to stop unwanted rendering.
// This component will render each choice row.
const Choice = memo(({ details: { selectedVote, choice, votes, votePercentage, url, voted, selectVote } }) => (
    <li  className={selectedVote === url ? 'voted' : ''}>
        <div>{choice}</div>
        <div className="center">{`${votes} votes`}</div>
        <div className="center">{`${votePercentage}%`}</div>
        <div className="center">
            <Button onClick={(evt) => selectVote(evt, url)} disabled={voted || selectedVote === url} primary label={selectedVote === url ? 'Voted' : 'Vote'} />
        </div>
    </li>
));

Choice.propTypes = {
    details: PropTypes.object.isRequired
};

export default Choice;
