import {
	GET_MESSAGES_FAILURE,
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS, GET_NEW_MESSAGES_FAILURE, GET_NEW_MESSAGES_REQUEST, GET_NEW_MESSAGES_SUCCESS,
	POST_MESSAGE_FAILURE,
	POST_MESSAGE_REQUEST,
	POST_MESSAGE_SUCCESS
} from "../actions/chatActions";

const initialState = {
	messages: null,
	lastDate: '',
	errorMessages: '',
	errorMessage: '',
	loading: false
};

const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MESSAGES_REQUEST:
			return {...state, loading: true}
		case GET_MESSAGES_SUCCESS:
			return {
				...state,
				messages: action.payload.messages,
				lastDate: action.payload.lastDate,
				loading: false
			}
		case GET_MESSAGES_FAILURE:
			return {...state, errorMessages: action.error, loading: false}
		case POST_MESSAGE_REQUEST:
			return {...state, loading: true}
		case POST_MESSAGE_SUCCESS:
			return {...state, loading: false}
		case POST_MESSAGE_FAILURE:
			return {...state, errorMessage: action.error, loading: false}
		case GET_NEW_MESSAGES_REQUEST:
			return {
				...state,
				messages: action.payload.messages,
				lastDate: action.payload.lastDate,
				loading: false
			}
		case GET_NEW_MESSAGES_SUCCESS:
			return {
				...state,
				messages: action.payload.messages,
				lastDate: action.payload.lastDate,
				loading: false
			}
		case GET_NEW_MESSAGES_FAILURE:
			return {...state, error: action.errorMessages, loading: false}
		default:
			return state
	}
};

export default chatReducer;