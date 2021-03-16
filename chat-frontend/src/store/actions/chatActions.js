import axiosApi from "../../axiosApi";

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILURE = 'POST_MESSAGE_FAILURE';

export const GET_NEW_MESSAGES_REQUEST = 'GET_NEW_MESSAGES_REQUEST';
export const GET_NEW_MESSAGES_SUCCESS = 'GET_NEW_MESSAGES_SUCCESS';
export const GET_NEW_MESSAGES_FAILURE = 'GET_NEW_MESSAGES_FAILURE';

export const getMessagesRequest = () => ({type: GET_MESSAGES_REQUEST});
export const getMessagesSuccess = payload => ({type: GET_MESSAGES_SUCCESS, payload});
export const getMessagesFailure = error => ({type: GET_MESSAGES_FAILURE, error});

export const postMessageRequest = () => ({type: POST_MESSAGE_REQUEST});
export const postMessageSuccess = () => ({type: POST_MESSAGE_SUCCESS});
export const postMessageFailure = error => ({type: POST_MESSAGE_FAILURE, error});

export const getNewMessageRequest = () => ({type: GET_NEW_MESSAGES_REQUEST});
export const getNewMessagesSuccess = payload => ({type: GET_NEW_MESSAGES_SUCCESS, payload});
export const getNewMessagesFailure = error => ({type: GET_NEW_MESSAGES_FAILURE, error});

export const fetchMessages = () => {
	return async dispatch => {
		try {
			const response = await axiosApi.get('/messages');
			const lastDate = response.data[response.data.length - 1].datetime;
			dispatch(getMessagesSuccess({messages: response.data, lastDate}));
		} catch (e) {
			dispatch(getMessagesFailure());
		}
	}
};

export const fetchNewMessages = (date) => {
	return async dispatch => {
		try {
			getNewMessageRequest();
			axiosApi.get(`/messages/:${date}`).then(response => {
				if(response.data.length > 0) {
					const lastDate = response.data[response.data.length - 1].datetime;
					dispatch(getNewMessagesSuccess(response.data, lastDate));
				}
			})
		} catch (e) {
			getNewMessagesFailure(e);
		}
	};
};

export const postMessage = message => {
	return async dispatch => {
		try {
			dispatch(postMessageRequest());
			await axiosApi.post('/messages', message);
			dispatch(postMessageSuccess());
		} catch (e) {
			dispatch(postMessageFailure());
		}
	}
};