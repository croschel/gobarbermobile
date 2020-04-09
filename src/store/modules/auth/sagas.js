import { all, call, put, takeLatest, delay } from 'redux-saga/effects';
import api from '~/services/api';
import { Alert } from 'react-native';
//import history from '~/services/history';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', { email, password });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Erro de Login', 'Usuário não pode ser prestador de serviço!')
      yield put(signFailure());
      return;
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield delay(2000);
    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha na autenticação',
      'Houve um erro no login, por favor verifique seus dados')
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,

    });
    // history.push('/');
    yield delay(2000);
    yield put(signUpSuccess());
  } catch (error) {
    Alert.alert('Falha no cadastro',
      'Houve um erro no cadastro, por favor verifiquer seus dados!');
    yield put(signFailure());
  }
}

export function SetToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push(`/`);
}

export default all([
  takeLatest('persist/REHYDRATE', SetToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
