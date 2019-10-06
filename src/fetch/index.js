
const { REACT_APP_API_URL } = process.env

/**
   * Function that sends the API call recieving parameteres
   * 
   * @param {String} path Path given to the api
   * @param {String} method METHOD given
   * @param {Object} dispatch Object needed to connect to redux
   * 
   * @returns {Promise} Information about the path and method specified, and dispatches accordingly. If dispatch if undefined
   *   it will return the value
   */
  export const call = ({path, method, dispatch, actionType}) => {
    return fetch(`${REACT_APP_API_URL}/${path}`, {
      method: method
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) throw Error(res.error)
        if(dispatch){
            return dispatch({ type: actionType, payload: res && res.results })
        }
        return res
      })
      .catch(err => {
        throw Error(err.message)
      })
  }