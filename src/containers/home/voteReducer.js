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

const failureMessage = (prevState, payload) => ({
    ...prevState,
    error: (payload && payload.message === 'Network Error') ? 'Please check the network and try again.' : 'Something went wrong. Please try again after some time.'
});

const voteReducer = (state = initialState, action = '') => {
    const { type, payload } = action;

    switch (type) {
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
                    if (payload) {
                        return {
                            ...prevState,
                            questionDetails: synthesizeQuestionDetails({ ...payload })
                        };
                    }

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

                    return failureMessage(prevState, payload);
                },
                failure: (prevState) => (failureMessage(prevState, payload)),
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
