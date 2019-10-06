import React, { useState }  from 'react'
import { connect } from "react-redux"
import { getData } from '../redux/actions/index'

function mapDispatchToProps(dispatch) {
    return {
        GET_DATA: item => dispatch(getData(item))
    }
}

const mapStateToProps = state => {
    return { vehicleTypes: state.vehicleTypes }
}

export const ConnectedForm = props => {

    const [searchInput, setSearchInput] = useState()
    const [vehicleTypeSearch, setVehicleTypeSearch] = useState()
    //state that manages if an API call is being made and sets the button for loading
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = event => {
        const {
            target: {
                value
            }
        } = event

        setSearchInput(value)
    }

    const handleSelectChange = event => {
        const {
            target: {
                value
            }
        } = event
        setVehicleTypeSearch(value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        setIsLoading(true)
        if (areInputsValid()) {
            props.GET_DATA({
                query: searchInput,
                path: vehicleTypeSearch
            })
            .then(()=>{
                setIsLoading(false)
            })
        }
    }

    const areInputsValid = () => {
        if (searchInput && vehicleTypeSearch) {
            return true
        }
        return false
    }

    const handleClearSearch = event => {
        event.preventDefault()
        setSearchInput('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='field'>
                <div className='control'>
                    <input onChange={handleInputChange} 
                        value={searchInput || ''} 
                        className='input' 
                        type='text' 
                        placeholder='Vehicle or Spaceship' />
                </div>
            </div>

            <div className='field'>
                <p className='control'>
                    <span className='select'>
                        <select onChange={handleSelectChange}>
                            <option value=''>Select</option>
                            {props && props.vehicleTypes && props.vehicleTypes.map((type, index) => {
                                return (
                                    <option key={index} value={type}>{type}</option>
                                )
                            })}
                        </select>
                    </span>
                </p>
            </div>

            <div className='buttons'>
                <button type='submit'
                disabled={!areInputsValid()}
                className={isLoading ? `button is-primary is-loading` : 'button is-primary'}>Search</button>
                <button onClick={handleClearSearch} className='button is-link'>Clear</button>
            </div>
        </form>
    )
}

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm)
export default Form
