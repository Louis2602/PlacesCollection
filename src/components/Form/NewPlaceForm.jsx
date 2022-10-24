import React from 'react';
import { useRef } from 'react';
import Card from '../UI/Card';

import classes from './NewPlaceForm.module.css';

const NewPlaceForm = ({ onAddPlace }) => {
	const titleInputRef = useRef();
	const typeInputRef = useRef();
	const imageInputRef = useRef();
	const addressInputRef = useRef();
	const descriptionInputRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();

		const enteredTitle = titleInputRef.current.value;
		const enteredType = typeInputRef.current.value;
		const enteredImage = imageInputRef.current.value;
		const enteredAddress = addressInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;

		const placesData = {
			title: enteredTitle,
			type: enteredType,
			image: enteredImage,
			address: enteredAddress,
			description: enteredDescription,
		};
		onAddPlace(placesData);
	};

	return (
		<Card>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='type'>Type of place</label>
					<input type='text' required id='type' ref={typeInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						required
						id='title'
						ref={titleInputRef}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor='image'>Image</label>
					<input type='url' required id='image' ref={imageInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='address'>Address</label>
					<input
						type='text'
						required
						id='address'
						ref={addressInputRef}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
						required
						rows='5'
						ref={descriptionInputRef}
					></textarea>
				</div>
				<div className={classes.actions}>
					<button>Add Place</button>
				</div>
			</form>
		</Card>
	);
};

export default NewPlaceForm;
