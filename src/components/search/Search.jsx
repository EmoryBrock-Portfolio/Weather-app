import React from 'react'

export default function Search({search, setSearch, searchSubmit}) {
  return (
    <div className='search-engine'>
        <input
        type="text"
        placeholder='Enter City Name'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
    <button onClick={searchSubmit}>
        Get Weather
    </button>
    </div>
  )
}
