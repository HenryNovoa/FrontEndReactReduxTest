import { call } from '../../fetch/index'
import { DATA_FETCH } from '../constants/actionTypes'

/**
 * 
 * @param {String} parameters The items to search for in the API
 * 
 * @returns {Promise} Calls the global function and fetches for data
 */
export const getData = parameters => {
    const { path, query } = parameters
    return dispatch => {
        return call({
            path: `${path}/?search=${query}`,
            method: 'GET',
            dispatch,
            actionType: DATA_FETCH
        })
    }
}