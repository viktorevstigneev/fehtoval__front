import React, { Fragment, useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { signUp } from './utils';
import { API_URL } from '../../../constants';
import SignInImg from '../../../img/logo.png';
import './style.css';

const SignUp = ({ user, setUser }) => {
	

	const handleFormSubmit = useCallback((evt) => {
		evt.preventDefault();
		const formData = Object.fromEntries(new FormData(evt.target));

		signUp({ formData, setUser });
	});

	return user?._id ? (
		<Navigate push to={`/`} />
	) : (
		<div className="auth">
			<div className="auth__container">
				<h2 className="auth__title">Регистрация</h2>
				<div className="auth__block">
					<form className="auth__form" action={API_URL} method="POST" onSubmit={handleFormSubmit}>
						<label className="auth__label" htmlFor="username">
							Логин
						</label>
						<input
							className="auth__input"
							name="username"
							id="username"
							// placeholder="Login"
							type="text"
							required={true}
						/>
						<label className="auth__label" htmlFor="password">
							Пароль
						</label>
						<input
							className="auth__input"
							name="password"
							id="password"
							// placeholder="Password"
							type="password"
							required={true}
						/>
						<button className="auth__button" type="submit">
							зарегистрироваться
						</button>

						<Link className="auth__link" to="/signin">
							хотите войти?
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
