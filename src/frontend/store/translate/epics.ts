import { ofType, ActionsObservable } from 'redux-observable'
import { mergeMap, catchError, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { TRANSLATE__REQUEST } from './types';
import { TRANSLATE_API_URL } from '../../constants';
import { TranslateRequestAction } from './types'
import { translateError, translateResponse } from './actions';
import { of } from 'rxjs';
import { AnyAction } from '../types';

export const translateEpic = (action$: any): ActionsObservable<AnyAction> => action$.pipe(
    ofType(TRANSLATE__REQUEST),
    mergeMap((action: TranslateRequestAction) => 
      ajax.getJSON(`${TRANSLATE_API_URL}${action.payload.queryString}`).pipe(
        map(response => translateResponse(response)),
        catchError(_ => of(translateError()))
      )
    )
  )