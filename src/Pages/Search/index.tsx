import { useQuery } from 'react-query'
import { ComboBox, Item, Section } from '@adobe/react-spectrum'
import { useState } from 'react'
import { getStarWarsEntities } from '../../shared/API'
import { useFilteredList } from './utils'
import { useDebounce } from "@uidotdev/usehooks";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, status: queryStatus } = useQuery(['all-entities', debouncedSearchTerm], () => getStarWarsEntities(debouncedSearchTerm), { enabled: debouncedSearchTerm.length > 0 })

  const comboBoxStatusDisplay = ({
    loading: 'loading',
    idle: 'idle',
    error: 'idle',
    success: 'idle',
  } as const)[queryStatus]

  const filteredItems = useFilteredList(data, searchTerm)

  return (
    <>
      <label className='text-2xl font-bold text-white mb-3'>Search the star wars universe</label>
      <ComboBox
        width="size-6000"
        items={filteredItems}
        loadingState={comboBoxStatusDisplay} onInputChange={searchTerm => setSearchTerm(searchTerm)}>
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
