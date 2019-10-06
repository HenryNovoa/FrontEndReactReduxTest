import { DATA_FETCH } from '../constants/actionTypes'

export const initialState = {
    vehicleTypes: [
        'vehicles',
        'starships'
    ],
    remoteItems:[{
        name: 'name',
        'model': 'model',
        length:'0'
    }]
}

const rootReducer = (state = initialState, action) => {
    if (action.type === DATA_FETCH) {
        return {
            ...state,
            remoteItems: action.payload
        }
    }
    return state
}

export default rootReducer