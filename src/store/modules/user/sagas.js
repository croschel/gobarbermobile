import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import {
  updateProfileSuccess,
  updateProfileFailure,
} from '~/store/modules/user/actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, 'users', profile);
    yield put(updateProfileSuccess(response.data));
    Alert.alert('Sucesso!', 'Dados atualizados com sucesso');
  } catch (err) {
    yield put(updateProfileFailure);
    Alert.alert('Falha na Atualização',
      'Houve um erro na atualização, favor verificar as informações');
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
