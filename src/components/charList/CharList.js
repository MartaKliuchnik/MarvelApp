import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		// this.foo.bar = 0; //check working errorBoundary
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((charList) => [...charList, ...newCharList]);
		setNewItemLoading((newItemLoading) => false);
		setOffset((offset) => offset + 9);
		setCharEnded((charEnded) => ended);
	};

	const itemsRef = useRef([]);

	const focusOnItem = (id) => {
		itemsRef.current.forEach((item) =>
			item.classList.remove('char__item_selected')
		);
		itemsRef.current[id].classList.add('char__item_selected');
		itemsRef.current[id].focus();
	};

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = { objectFit: 'cover' };
			if (
				item.thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle = { objectFit: 'unset' };
			}

			return (
				<li
					className='char__item'
					ref={(el) => (itemsRef.current[i] = el)}
					key={item.id}
					onClick={() => {
						props.onCharSelected(item.id);
						focusOnItem(i);
					}}
				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className='char__name'>{item.name}</div>
				</li>
			);
		});

		return <ul className='char__grid'>{items}</ul>;
	}

	const items = renderItems(charList);

	const spinner = loading && !newItemLoading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;

	return (
		<div className='char__list'>
			{spinner}
			{errorMessage}
			{items}
			<button
				disabled={newItemLoading}
				style={{ display: charEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
				className='button button__main button__long'
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

CharList.propType = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
