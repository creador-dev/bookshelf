/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState, useEffect} from 'react'
import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import {response} from 'msw'

function DiscoverBooksScreen() {
  const [query, setQuery] = useState('')
  const [queried, setQueried] = useState(false)
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!queried) return
    setStatus('loading')
    window
      .fetch(
        `${process.env.REACT_APP_API_URL}/books?query= ${encodeURIComponent(
          query,
        )}`,
      )
      .then(async response => {
        const data = await response.json()
        if (response.ok) {
          setData(data)
          setStatus('success')
        } else {
          return Promise.reject(data)
        }
      })
  }, [queried, query])

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  function handleSearchSubmit(event) {
    event.preventDefault()
    const {search} = event.target.elements
    setQuery(search.value)
    setQueried(true)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
