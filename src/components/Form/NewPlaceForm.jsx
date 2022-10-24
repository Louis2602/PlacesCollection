import React from 'react';
import { useRef, useState } from 'react';
import Card from '../UI/Card';

import {
	Box,
	Button,
	Select,
	InputLabel,
	MenuItem,
	FormControl,
	styled,
	TextField,
	Grid,
} from '@mui/material';

const StyledInputLabel = styled(InputLabel)({
	display: 'block',
	fontWeight: 'bold',
	marginBottom: '0.5rem',
	color: 'inherit',
});
const StyledButton = styled(Button)({
	font: 'inherit',
	cursor: 'pointer',
	backgroundColor: '#77002e',
	color: 'white',
	padding: '0.5rem 1.5rem',
	border: '1px solid #77002e',
	borderRadius: '4px',
	fontWeight: 'bold',
	'&:hover, active': {
		backgroundColor: '#a50e48',
		borderColor: '#a50e48',
	},
});
const StyledBox = styled(Box)({
	marginTop: '1rem',
	textAlign: 'right',
});

const StyledForm = styled('form')({
	padding: '1rem 1rem',
	width: '40rem',
});
const NewPlaceForm = ({ onAddPlace }) => {
	const titleInputRef = useRef();
	const imageInputRef = useRef();
	const addressInputRef = useRef();
	const descriptionInputRef = useRef();

	const [type, setType] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();

		const enteredTitle = titleInputRef.current.value;
		const enteredType = type;
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
	const handleTypeChange = (e) => {
		setType(e.target.value);
	};
	return (
		<Card>
			<StyledForm onSubmit={submitHandler}>
				{/* <div className={classes.control}>
					<label htmlFor='type'>Type of place</label>
					<input type='text' required id='type' ref={typeInputRef} />
				</div> */}
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<StyledInputLabel htmlFor='type'>
								Type of place
							</StyledInputLabel>
							<Select
								required
								value={type}
								label='Type of place'
								onChange={handleTypeChange}
							>
								<MenuItem value='restaurant'>
									Restaurants
								</MenuItem>
								<MenuItem value='hotel'>Hotels</MenuItem>
								<MenuItem value='attraction'>
									Attractions
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<StyledInputLabel htmlFor='title'>
							Title
						</StyledInputLabel>
						<TextField
							fullWidth
							required
							variant='outlined'
							id='title'
							type='text'
							inputRef={titleInputRef}
							placeholder='Title'
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledInputLabel htmlFor='image'>
							Image
						</StyledInputLabel>
						<TextField
							fullWidth
							required
							type='url'
							variant='outlined'
							id='image'
							inputRef={imageInputRef}
							placeholder='Image'
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledInputLabel htmlFor='address'>
							Address
						</StyledInputLabel>
						<TextField
							fullWidth
							required
							variant='outlined'
							id='address'
							type='text'
							inputRef={addressInputRef}
							placeholder='Address'
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledInputLabel htmlFor='description'>
							Description
						</StyledInputLabel>
						<TextField
							fullWidth
							rows={6}
							multiline
							required
							variant='outlined'
							id='description'
							type='text'
							inputRef={descriptionInputRef}
							placeholder='Description'
						/>
					</Grid>
					<StyledBox flex='1'>
						<StyledButton type='submit'>Add Place</StyledButton>
					</StyledBox>
				</Grid>
			</StyledForm>
		</Card>
	);
};

export default NewPlaceForm;
