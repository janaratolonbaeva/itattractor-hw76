import React from 'react';
import './Send.css';

const Send = (props) => {
	return (
		<form onSubmit={props.sendMessage}>
			<div className="Form mb-5">
				<label className="form-label mb-3">Write message</label>
				<textarea
					name="text"
					className="form-control mb-3"
					rows="3" value={props.text}
					onChange={props.changeValue}
				/>
				<input
					type="text"
					name="author"
					className="form-control mb-3"
					placeholder="name"
					value={props.author}
					onChange={props.changeValue}
				/>
				<button type="submit" className="btn btn-primary mb-3">Send</button>
			</div>
		</form>
	);
};

export default Send;