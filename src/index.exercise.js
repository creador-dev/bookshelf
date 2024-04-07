import '@reach/dialog/styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Dialog} from '@reach/dialog'
import {Logo} from './components/logo'

const App = () => {
  const [openModal, setOpenModal] = React.useState('none')

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={'login' === openModal}>
        <div>
          <h3>Login Modal</h3>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={'register' === openModal}>
        <div>
          <h3>Registration Modal</h3>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
      </Dialog>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
