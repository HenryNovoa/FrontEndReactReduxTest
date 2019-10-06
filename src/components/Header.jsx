import React from 'react'

const Header = props => {
    return (
        <div className="section">
            <h1 className="title">STARWARS</h1>
            <p className="subtitle">
                Search for your favorite star wars vehicles and starships and see their length in meters!
      </p>
            {props.children}
        </div>
    )
}

export default Header