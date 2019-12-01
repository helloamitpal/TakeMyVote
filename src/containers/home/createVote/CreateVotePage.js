import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as voteActionCreators from '../voteActionCreator';
import Button from '../../../components/button';
import ErrorMessage from '../../../components/error';
import config from '../../../config';

import './createVotePage.css';

const CreateVotePage = ({ voteState, voteActions, history }) => {
    const { loading, error, created } = voteState;
    const MAX_CHOICE = 4;
    const MIN_CHOICE = 2;

    const [choices, setChoices] = useState([{ id: 1, value: '' }, { id: 2, value: '' }]);
    const [question, setQuestion] = useState('');
    const [redundantChoice, setRedundantChoice] = useState(-1);

    const createVote = (evt) => {
        voteActions.createVote({
            question,
            choices: choices.map(({ value }) => (value))
        });
    };

    const gotoPreviousPage = (evt) => {
        history.push(config.HOME_PAGE);
    };

    const onChangeQuestion = ({ target: { value } }) => {
        setQuestion(value);
    };

    const addMoreChoice = (evt) => {
        const lastId = choices[choices.length - 1].id + 1;
        const choiceObj = { id: lastId, value: '' };
        setChoices([...choices, { ...choiceObj }]);
    };

    const onChangeChoiceText = ({ target: { value } }, index) => {
        const list = [...choices];
        const redundantIndex = choices.findIndex((obj) => (value.length > 1 && obj.value.toLowerCase().indexOf(value.toLowerCase()) >= 0));

        setRedundantChoice(redundantIndex >= 0 ? index : redundantIndex);

        const { id } = list[index];
        Object.assign(list[index], { id, value });
        setChoices([ ...list ]);
    }

    const removeChoice = (evt, index) => {
        const list = [...choices];
        list.splice(index, 1);
        setChoices([ ...list ]);
    };

    return (
        <div className="create-vote-page-container">
            <ErrorMessage loading={loading} hasError={error} message={error} />
            {created && !error && !loading && <p className="success">Vote has been created successfully</p>}
            <label htmlFor="question">
                Question
                <input readOnly={created} type="text" name="question" onChange={onChangeQuestion} placeholder="Write your question" />
            </label>
            <h3>Choices</h3>
            {
                choices.map(({ value, id }, index) => (
                    <div className="choice-section" key={`choice-input-${id}`}>
                        <input readOnly={created} value={value} type="text" onChange={(evt) => onChangeChoiceText(evt, index)} placeholder={`Choice ${index+1}`} />
                        {redundantChoice >= 0 && redundantChoice === index && <span className="inline-error">Redundant choice</span>}
                        {(index + 1) < choices.length && choices.length > MIN_CHOICE && <Button className="choice-btn" label="Remove" onClick={(evt) => removeChoice(evt, index)} />}
                        {(index + 1) === choices.length && <Button className="choice-btn" disabled={choices.length >= MAX_CHOICE} label="Add" onClick={addMoreChoice} />}
                    </div>
                ))
            }
            <div className="button-section">
                <Button label="Back" onClick={gotoPreviousPage} />
                <Button label="Submit" disabled={created || redundantChoice >= 0} primary onClick={createVote} />
            </div>
        </div>
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
