import React from 'react'

const ModalContext = React.createContext({})

export const useModalContext = () => React.useContext(ModalContext)

function ModalContextProvider({ children }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const handleClose = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)
  const inputStyle = {
    width: '100%',
    height: 38,
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    background: '#D9D9D9',
    border: 0,
    margin: '5px auto 15px auto'
  }

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        setModalIsOpen,
        handleClose,
        openModal,
        inputStyle,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider
