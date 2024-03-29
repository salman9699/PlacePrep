import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

export const setLoadingQuiz = () => (dispatch) => {
    dispatch({
        type: actionTypes.SET_LOADING_QUIZ
    });
};

// Load user
export const getQuizzes = () => async (dispatch) => {
    dispatch({
        type: actionTypes.SET_LOADING_QUIZ
    });
    try {
        const res = await axios.get(`/api/v1/quizzes`);

        dispatch({
            type: actionTypes.GET_QUIZZES,
            payload: res.data.data.quizzes
        });
    }
    catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const getQuiz = (slug, check = false) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.get(`/api/v1/quizzes/${slug}?check=${check}`);


        if (res.data.message === 'Quiz is deactivated') {
            return dispatch({
                type: actionTypes.SET_CURRENT_QUIZ,
                payload: null
            });
        }
        dispatch({
            type: actionTypes.GET_QUIZ,
            payload: {
                currentQuiz: res.data.data.data,
                subCount: res.data.data.subCount
            }
        });
    }
    catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const addQuiz = (quiz) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.post('/api/v1/quizzes', quiz, config);


        if (res.request.status === 201 && res.request.statusText === 'Created') {
            dispatch({
                type: actionTypes.QUIZ_CREATED_SUCCESS
            });
        }

        dispatch({
            type: actionTypes.ADD_QUIZ,
            payload: res.data.data.data
        });
    }
    catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const updateQuiz = (quiz) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.patch(`/api/v1/quizzes/${quiz._id}`, quiz, config);


        if (res.request.status === 200 && res.request.statusText === 'OK') {
            dispatch({
                type: actionTypes.QUIZ_CREATED_SUCCESS
            });
        }

        dispatch({
            type: actionTypes.UPDATE_QUIZ,
            payload: res.data.data.data
        });
    }
    catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const deleteQuiz = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.delete(`/api/v1/quizzes/${id}`);


        if (res.request.status === 204 && res.request.statusText === 'No Content') {
            dispatch({
                type: actionTypes.QUIZ_DELETED_SUCCESS
            });
        }

        dispatch({
            type: actionTypes.DELETE_QUIZ,
            payload: id
        });
    }
    catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const deleteQuizQuestion = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        await axios.delete(`/api/v1/quizQuestions/${id}`);


        dispatch({
            type: actionTypes.DELETE_QUIZ_QUESTION,
            payload: id
        });

    } catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const setCurrentQuiz = (quiz) => async (dispatch) => {
    dispatch({
        type: actionTypes.SET_CURRENT_QUIZ,
        payload: quiz
    });
};

export const startQuiz = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.get(`/api/v1/quizzes/start/${id}`);

        dispatch({
            type: actionTypes.SET_USER_FROM_START_QUIZ,
            payload: res.data.data.user
        });
        dispatch({
            type: actionTypes.START_QUIZ,
            payload: res.data.data.quiz
        });

    } catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const submitQuiz = (id, userQuiz) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.post(`/api/v1/quizzes/submit/${id}`, userQuiz, config);


        if (res.request.status === 200 && res.request.statusText === 'OK') {
            dispatch({
                type: actionTypes.QUIZ_CREATED_SUCCESS
            });
        }

        dispatch({
            type: actionTypes.SUBMIT_QUIZ,
            payload: res.data.data.quizSubmission
        });
    } catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const getQuizSubmissions = (queryObj) => async (dispatch) => {
    try {
        let queryKey = '';
        let queryVal = '';
        if (queryObj) {
            queryKey = queryObj.user ? 'user' : 'quiz';
            queryVal = queryObj.user ? queryObj.user : queryObj.quiz;
        }
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.get(`/api/v1/quizSubmissions?${queryKey}=${queryVal}`);

        dispatch({
            type: actionTypes.GET_QUIZ_SUBMISSIONS,
            payload: res.data.data.quizSubmissions
        });
    } catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const getQuizSubmission = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.get(`/api/v1/quizSubmissions/${id}`);

        dispatch({
            type: actionTypes.GET_QUIZ_SUBMISSION,
            payload: res.data.data.data
        });
    } catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};

export const deleteQuizSubmission = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.SET_LOADING_QUIZ
        });
        const res = await axios.delete(`/api/v1/quizSubmissions/${id}`);


        if (res.request.status === 204 && res.request.statusText === 'No Content') {
            dispatch({
                type: actionTypes.QUIZ_DELETED_SUCCESS
            });
        }

        dispatch({
            type: actionTypes.DELETE_QUIZ_SUBMISSION,
            payload: id
        });
    } catch (err) {

        dispatch({
            type: actionTypes.QUIZ_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    };
};

export const clearQuizErrors = () => ({ type: actionTypes.CLEAR_QUIZ_ERRORS });

export const filterQuizSubmissions = (query, isStudent) => (dispatch) => {

    dispatch({
        type: actionTypes.FILTER_QUIZ_SUBMISSIONS,
        payload: {
            query,
            isStudent
        }
    });
};

export const clearFilterQuizSub = () => (dispatch) => {
    dispatch({
        type: actionTypes.CLEAR_FILTER_QUIZ_SUBMISSIONS
    });
};

export const filterQuizzes = (query) => (dispatch) => {
    dispatch({
        type: actionTypes.FILTER_QUIZZES,
        payload: query
    });
};

export const clearFilterQuizzes = () => (dispatch) => {
    dispatch({
        type: actionTypes.CLEAR_FILTER_QUIZZES
    });
};

export const clrQuizCreateSuccess = () => (dispatch) => {
    dispatch({
        type: actionTypes.CLR_QUIZ_CREATED_SUCCESS
    });
};

export const clrQuizDeleteSuccess = () => (dispatch) => {
    dispatch({
        type: actionTypes.CLR_QUIZ_DELETED_SUCCESS
    });
};
