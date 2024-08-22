import { useQuery } from 'react-query'
import { ComboBox, Item, Section } from '@adobe/react-spectrum'
import { useState } from 'react'
import { getStarWarsEntities } from '../../shared/API'
import { useFilteredList } from './utils'


function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, status: queryStatus } = useQuery(['all-entities', searchTerm], () => getStarWarsEntities(searchTerm), { enabled: searchTerm.length > 0 })

  const comboBoxStatusDisplay = ({
    loading: 'loading',
    idle: 'idle',
    error: 'idle',
    success: 'idle',
  } as const)[queryStatus]

  const filteredItems = useFilteredList(data, searchTerm)

  return (
    <>
      <ComboBox
        items={filteredItems}
        loadingState={comboBoxStatusDisplay} label="Search the star wars universe" onInputChange={searchTerm => setSearchTerm(searchTerm)}>
        {item => (
          <Section key={item.name} items={item.children} title={item.name}>
            {item => <Item key={item.name} {...item}>{item.name}</Item>}
          </Section>
        )}
      </ComboBox>
    </>
  )
}

export default SearchPage
