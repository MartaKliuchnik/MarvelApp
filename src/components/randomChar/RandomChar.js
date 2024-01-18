import { useEffect, useState } from 'react';
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
	const [char, setChar] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => {
		// this.foo.bar = 0; //check working errorBoundary
		updateChar();
		const timeId = setInterval(updateChar, 60000);

		return () => {
			clearInterval(timeId);
		};
		// this.timeId = setInterval(this.updateChar, 3000);
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
		setLoading(false);
		setError(false);
	};

	const onCharLoading = () => {
		setLoading(true);
	};

	const onError = () => {
		setLoading(false);
		setError(true);
	};

	const updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		onCharLoading();

		marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || errorMessage) ? <View char={char} /> : null;

	return (
		<div className='randomchar'>
			{errorMessage}
			{spinner}
			{content}

			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button className='button button__main' onClick={updateChar}>
					<div className='inner'>try it</div>
				</button>
				<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
			</div>
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;

	const styleForThumbnail =
		thumbnail ===
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			? { objectFit: 'unset' }
			: {};

	const descriptionElem =
		description?.length >= 180
			? `${description.slice(0, 180)}...`
			: description;

	return (
		<div className='randomchar__block'>
			<img
				src={thumbnail}
				alt='Random character'
				className='randomchar__img'
				style={styleForThumbnail}
			/>
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{descriptionElem}</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>homepage</div>
					</a>
					<a href={wiki} className='button button__secondary'>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
