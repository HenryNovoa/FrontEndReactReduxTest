import React from 'react'
import { connect } from 'react-redux'
const mapStateToProps = state => {
    return { remoteItems: state.remoteItems}
}

export const ConnectedList = (props) => (
    <div className='section'>
        <h1 className='title'>Search Results</h1>
        <ul className='content'>
            {props && props.remoteItems && props.remoteItems.length ?
               props && props.remoteItems && props.remoteItems.map((el, index) => (
                <li className='box' key={index}>
                    <div className='columns'>
                        <div className='column'>
                            {`name:${el.name} `}
                        </div>
                        <div className='column'>
                            {`model: ${el.model}`}
                        </div>
                        <div className='column'> 
                            {`length: ${el.length} meters`}
                        </div>
                    </div>
                </li>
            )):
            <li className='box'>
                    <div className='columns'>
                        <div className='column'>
                            {'No Search Results'}
                        </div>
                    </div>
                </li>
            }
        </ul>
    </div>
)
const List = connect(mapStateToProps)(ConnectedList)
export default List

