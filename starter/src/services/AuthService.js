import fetch from 'auth/FetchInterceptor'
import { API_BASE_URL } from 'configs/AppConfig';

const AuthService = {}

AuthService.login = function (data) {
	return fetch({
		url: '/auth/login',
		method: 'post',
		data: data
	})
}

AuthService.register = async function (data) {
    await fetch({
		url: `${API_BASE_URL}/api/register`,
		method: 'post',
		data: data
	}).then((res) => {
	console.log("1");
		return res
	}).catch((error) => {
console.log("2");
	});
}

AuthService.logout = function () {
	return fetch({
		url: '/auth/logout',
		method: 'post'
	})
}

AuthService.loginInOAuth = function () {
	return fetch({
		url: '/auth/loginInOAuth',
		method: 'post'
	})
}

export default AuthService;