import React, { useCallback, useEffect, useState } from 'react';
import DoubleSlider from 'double-slider';

// import Footer from '../../common/Footer';

import { clothesType, sexType, cardsData } from './data';
import './style.css';
import { API_URL, POPUP_OVERLAY_CLASSNAME } from '../../../constants';
import Modal from '../../common/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClothesPage = () => {
	const [user, setUser] = useState();

	const [sliderMin, setMin] = useState(0);
	const [sliderMax, setMax] = useState(500);
	const [searchValue, setSearchValue] = useState('');

	const [cardData, setCardData] = useState();

	const [filteredCards, setFilteredCards] = useState();

	const [filter, setFilter] = useState({
		maxPrice: 100,
		minPrice: 0,
		// sex: ['Female', 'Male'],
		type: ['Защита','Костюм','Маска' ,'Шпаги' ,'Обувь' ]
	});

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	useEffect(() => {
		const getClothes = async () => {
			const responseData = await axios.get(`${API_URL}/team`, { withCredentials: true }).then((response) => {
				setCardData(response.data);
				setFilteredCards(response.data);
			});
		};
		getClothes();
		// setCardData(cardsData);
		// setFilteredCards(cardsData);
	}, []);

	useEffect(() => {
		const mySlider = new DoubleSlider(document.getElementById('my-slider'));

		mySlider.addEventListener('slider:change', () => {
			const { min, max } = mySlider.value;
			setMin(min || 0);
			setMax(max || 500);
			setFilter({
				...filter,
				minPrice: min,
				maxPrice: max,
			});
		});
	}, []);

	const filterArray = (arr) => {
		let newArr = arr && arr.filter((item) => item.price > filter.minPrice && item.price < filter.maxPrice);
		console.log('filter: ', filter);

		newArr = newArr.filter((item) => filter.type.includes(item.typeClothes));

		return newArr;
	};

	const handleApplyFilters = (evt) => {
		evt.preventDefault();

		setFilteredCards(filterArray(cardData));
	};

	const handleSearhChange = (evt) => {
		setSearchValue(evt.target.value);
	};

	return (
		<>
			<main className="clothes">
				<div className="clothes__container">
					<form className="Clothes__top" action="" onSubmit={handleApplyFilters}>
						<div className="filter__top">
							<div className="filter__block">
								<h2 className="filter__title">Цена</h2>
								<div id="my-slider" data-min="0" data-max="500" data-range="500"></div>
								<div className="filter__price">
									<div className="filter__cost">{sliderMin}$</div>
									<div className="filter__cost">{sliderMax}$</div>
								</div>
							</div>
							<div className="filter__block">
								<h2 className="filter__title">Тип</h2>
								<div className="filter__wrapper">
									{clothesType.map(({ id, translate }) => (
										<div className="filter__item">
											<input
												className="filter__checkbox"
												onChange={(evt) => {
													const newArr = filter.type;

													if (evt.target.checked) {
														newArr.push(evt.target.name);
														let set = new Set(newArr);

														setFilter({
															...filter,
															type: Array.from(set),
														});
													} else {
														newArr.pop(evt.target.name);
														let set = new Set(newArr);

														setFilter({
															...filter,
															type: Array.from(set),
														});
													}
												}}
												type="checkbox"
												id={translate}
												name={translate}
											/>
											<label className="filter__label" htmlFor={translate}>
												{translate}
											</label>
										</div>
									))}
								</div>
							</div>
						</div>
						<button className="filter__apply">Применить фильтры</button>
					</form>

					<input className="filter__search" type="text" placeholder="Поиск товара" onChange={handleSearhChange} />

					<div className="clothes__content">
						{filteredCards ? (
							filteredCards
								.filter((item) => searchValue == '' || item?.name.includes(searchValue))
								.map((item) => (
									<Link to={`/thing/${item._id}`} className="clothes__card">
										{user && user.isAdmin && (
											<span
												className="clothes_card--delete"
												onClick={async (event) => {
													event.stopPropagation();
													await axios.delete(`${API_URL}/team/${item._id}`, { withCredentials: true });
												}}
											>
												&times;
											</span>
										)}
										<img
											className="clothes__img"
											src={`${API_URL}/getImage/${item.avatar}`}
											// src={item.image}
											alt=""
										/>
										<p className="clothes__name">{item.name}</p>
										<div className="clothes__bottom">
											<p className="clothes__price">Price: {item.price}$</p>
										</div>
									</Link>
								))
						) : (
							<p className="clothes__price">Ничего не найдено</p>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default ClothesPage;
