import { handle } from 'redux-pack';

import * as actionTypes from './voteActionTypes';
import { synthesizeQuestionDetails } from './voteHelper';

// initial store state
const initialState = {
    questions: null,
    error: '',
    loading: false,
    voted: false,
    questionDetails: null,
    created: false
};

// common failure function for all APIs
const failureMessage = (prevState, payload) => ({
    ...prevState,
    error: (payload && payload.message === 'Network Error') ? 'Please check the network and try again.' : 'Something went wrong. Please try again after some time.'
});

const voteReducer = (state = initialState, action = '') => {
    const { type, payload } = action;

    switch (type) {
        // Reducer for getting the all questions API
        case actionTypes.GET_ALL_QUESTIONS: {
            return handle(state, action, {
                start: (prevState) => ({
                    ...prevState,
                    error: '',
                    loading: true,
                    created: false,
                    voted: false
                }),
                success: (prevState) => ({
                    ...prevState,
                    questions: [...payload]
                }),
                failure: (prevState) => (failureMessage(prevState, payload)),
                finish: (prevState) => ({
                    ...prevState,
                    loading: false
                })
            });
        }

        // Reducer for casting user's vote API
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
                failure: (prevState) => (failureMessage(prevState, payload)),
                finish: (prevState) => ({
                    ...prevState,
                    loading: false
                })
            });
        }

        // Reducer for getting question related details API
        case actionTypes.GET_QUESTION_DETAILS: {
            return handle(state, action, {
                start: (prevState) => ({
                    ...prevState,
                    error: '',
                    loading: true,
                    questionDetails: null,
                    url: payload.url
                }),
                success: (prevState) => {
                    // if CORB is not taking place in development mode, then it would get the response and
                    // will process the same and return synthesized response accordingly
                    if (payload) {
                        return {
                            ...prevState,
                            questionDetails: synthesizeQuestionDetails({ ...payload })
                        };
                    }

                    // In case, CORB issue takes place then it consider previous state question list
                    // and taking out the respective object of the requested question details
                    if (prevState && prevState.questions) {
                        const { url } = prevState;
                        const data = prevState.questions.filter((item) => (url === item.url));

                        if (data.length > 0) {
                            return {
                                ...prevState,
                                questionDetails: synthesizeQuestionDetails({ ...data[0] })
                            }
                        }
                    }

                    // if that too doesn't work out, it would return failure message
                    return failureMessage(prevState, payload);
                },
                failure: (prevState) => (failureMessage(prevState, payload)),
                finish: (prevState) => ({
                    ...prevState,
                    loading: false
                })
            });
        }

        // Reducer for submitting a request for a new vote API
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
                failure: (prevState) => (failureMessage(prevState, payload)),
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
