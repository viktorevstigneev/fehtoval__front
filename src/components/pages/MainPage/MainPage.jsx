import React, { useEffect, useState } from 'react';

import './style.css';
// import axios from 'axios';
// import { API_URL } from '../../../constants';

const MainPage = () => {
	const [user, setUser] = useState();
	const [newsData, setNewsData] = useState('Новое пополнение коллекции. Добавлены женская грудная защита');

	// useEffect(() => {
	// 	const getBenners = async () => {
	// 		const responseData = await axios
	// 			.get(`${API_URL}/banner`, { withCredentials: true })
	// 			.then((response) => setBannerData(response.data));
	// 	};
	// 	getBenners();
	// }, []);
	return (
		<>
			<main className="home__main">
				<h1 className="home__title">Добро пожаловать</h1>
				<p className="home_caption">Fence Gear - все для фехтования </p>
				<div className="home__news">
					{user && user.isAdmin ? (
						<textarea type="text" className="home__news-edit-input" value={newsData}></textarea>
					) : (
						<div className="home__new-container">{newsData}</div>
					)}
				</div>
			</main>
		</>
	);
};

export default MainPage;
