import { handle } from 'redux-pack';

import * as actionTypes from './voteActionTypes';
import { synthesizeQuestionDetails } from './voteHelper';

const initialState = {
    questions: null,
    error: '',
    loading: false,
    voted: false,
    questionDetails: null,
    created: false
};

const temp = {
    "question": "Favourite hot beverage?",
    "published_at": "2015-05-27T21:22:26.648000+00:00",
    "url": "/questions/9",
    "choices": [
        {
            "choice": "Apple Cider",
            "votes": 7,
            "url": "/questions/9/choices/67"
        },
        {
            "choice": "Coffee",
            "votes": 4,
            "url": "/questions/9/choices/66"
        },
        {
            "choice": "Hot Chocolate",
            "votes": 2,
            "url": "/questions/9/choices/68"
        },
        {
            "choice": "Tea",
            "votes": 1,
            "url": "/questions/9/choices/65"
        }
    ]
};

const voteReducer = (state = initialState, action = '') => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.GET_ALL_QUESTIONS: {
            return handle(state, action, {
                start: (prevState) => ({
                    ...prevState,
                    error: '',
                    loading: true,
                    created: false
                }),
                success: (prevState) => ({
                    ...prevState,
                    questions: [...payload]
                }),
                failure: (prevState) => ({
                    ...prevState,
                    error: 'Something went wrong. Please try again after some time.'
                }),
                finish: (prevState) => ({
                    ...prevState,
                    loading: false
                })
            });
        }

        case actionTypes.CAST_VOTE: {
            return handle(state, action, {
                start: (prevState) => ({
                    ...prevState,
                    error: '',
                    loading: true,
                    voted: false
                }),
                success: (prevState) => ({
                    ...prevState,
                    voted: true
                }),
                failure: (prevState) => ({
                    ...prevState,
                    error: 'Something went wrong. Please try again after some time.'
                }),
                finish: (prevState) => ({
                    ...prevState,
                    loading: false
                })
            });
        }

        case actionTypes.GET_QUESTION_DETAILS: {
            return handle(state, action, {
                start: (prevState) => ({
                    ...prevState,
                    error: '',
                    loading: true,
                    questionDetails: null
                }),
                success: (prevState) => ({
                    ...prevState,
                    questionDetails: synthesizeQuestionDetails(temp /*{ ...payload }*/)
                }),
                failure: (prevState) => ({
                    ...prevState,
                    error: 'Something went wrong. Please try again after some time.'
                }),
                finish: (prevState) => ({
                    ...prevState,
                    loading: false
                })
            });
        }

        case actionTypes.CREATE_VOTE: {
            return handle(state, action, {
                start: (prevState) => ({
                    ...prevState,
                    error: '',
                    loading: true,
                    created: false
                }),
                success: (prevState) => ({
                    ...prevState,
                    created: true
                }),
                failure: (prevState) => ({
                    ...prevState,
                    error: 'Something went wrong. Please try again after some time.'
                }),
                finish: (prevState) => ({
                    ...prevState,
                    loading: false
                })
            });
        }

        default:
            return state;
    }
};

export default voteReducer;
