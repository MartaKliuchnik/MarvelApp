import './charList.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210,
		charEnded: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		// this.foo.bar = 0; //check working errorBoundary
		this.onRequest();
	}

	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError);
	};

	onCharListLoading = () => {
		this.setState({ newItemLoading: true });
	};

	onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		this.setState(({ offset, charList }) => ({
			charList: [...charList, ...newCharList],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended,
		}));
	};

	onError = () => {
		this.setState({ loading: false, error: true });
	};

	itemsRef = [];

	setRef = (ref) => {
		this.itemsRef.push(ref);
	};

	focusOnItem = (id) => {
		this.itemsRef.forEach((item) =>
			item.classList.remove('char__item_selected')
		);
		this.itemsRef[id].classList.add('char__item_selected');
		this.itemsRef[id].focus();
	};

	renderItems(arr) {
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
					ref={this.setRef}
					key={item.id}
					onClick={() => {
						this.props.onCharSelected(item.id);
						this.focusOnItem(i);
					}}
				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className='char__name'>{item.name}</div>
				</li>
			);
		});

		return <ul className='char__grid'>{items}</ul>;
	}

	render() {
		const { charList, loading, error, newItemLoading, offset, charEnded } =
			this.state;
		const items = this.renderItems(charList);

		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className='char__list'>
				{spinner}
				{errorMessage}
				{content}
				<button
					disabled={newItemLoading}
					style={{ display: charEnded ? 'none' : 'block' }}
					onClick={() => this.onRequest(offset)}
					className='button button__main button__long'
				>
					<div className='inner'>load more</div>
				</button>
			</div>
		);
	}
}

CharList.propType = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
