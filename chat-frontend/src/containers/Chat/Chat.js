import React, {useState, useEffect} from 'react';
import Send from "../../components/Send/Send";
import Message from "../../components/Message/Message";
import './Chat.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages, fetchNewMessages, postMessage} from "../../store/actions/chatActions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Chat = () => {
	const dispatch = useDispatch();
	const messages = useSelector(state => state.messages);
	const lastDate = useSelector(state => state.lastDate);
	const loading = useSelector(state => state.loading);
	const [message, setMessage] = useState({
		text: '',
		author: ''
	});

	useEffect(() => {
		dispatch(fetchMessages());
	}, [dispatch]);

	const changeHandlerValue = (e) => {
		const {name, value} = e.target;

		setMessage(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const sendMessage = (e) => {
		e.preventDefault();

		dispatch(postMessage(message));
	};


	useEffect(() => {
		let interval = null;

		if(lastDate) {
			interval = setInterval(function () {
				dispatch(fetchNewMessages(lastDate));
			}, 3000);
		}

		return () => clearInterval(interval);
	}, [dispatch, lastDate]);

	let messagesPrint = null;

	if (loading) {
		messagesPrint = <Spinner/>
	};

	messagesPrint = (
		<div className="messages-block mt-3">
			{messages && (messages.map((item) => {
				return (
					<Message key={item.id} message={item.text} author={item.author}/>
				)
			}))}
		</div>
	);

	return (
		<>
			<div className="container mt-2 flex-column-reverse">
				<Send message={message.text}
							author={message.author}
							changeValue={changeHandlerValue}
							sendMessage={sendMessage}
				/>
				{messagesPrint}
			</div>
		</>
	);
};

export default Chat;