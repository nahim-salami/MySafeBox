import React from 'react'
import ReactDOM from 'react-dom'

function Modal({
  title,
  actionText,
  open,
  setOpen,
  children,
  handleClose,
  basic,
}) {
  const ButtonStyle = { borderRadius: '0', padding: '8px 30px' }

  const wrapperStyle = {
    background: 'rgba(0, 0, 0, .7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: '1000',
    fontSize: 19,
  }

  const modalStyle = {
    height: 'auto',
    width: '35%',
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.99',
  }

  const modalInfoStyle = {
    width: '100%',
    padding: '20px 0 4px 30px',
    background: '#3399E4',
    height: 30,
  }

  const childrenWrapperStyle = {
    padding: '20px 30px',
    minHeight: 40,
    width: 'calc(100% - 30px * 2)',
  }

  const modalCloseWrapper = {
    width: 'calc(100% - 30px * 2)',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'flex-end',
  }

  const handleBlur = (e) =>
    e.target.className === 'wrapper' ? setOpen(false) : open

  return (
    open &&
    ReactDOM.createPortal(
      <>
        {basic && (
          <div
            className="wrapper"
            onClick={handleBlur}
            style={{ ...wrapperStyle, alignItems: 'flex-start' }}
          >
            {children}
          </div>
        )}
        {!basic && (
          <div className="wrapper" style={wrapperStyle} onClick={handleBlur}>
            <div style={modalStyle}>
              <div style={modalInfoStyle}>{title}</div>
              <div style={childrenWrapperStyle}>{children}</div>

              <div style={modalCloseWrapper}>
                <button
                  className="general-btn"
                  style={ButtonStyle}
                  onClick={handleClose}
                >
                  {actionText}
                </button>
              </div>
            </div>
          </div>
        )}
      </>,
      document.getElementById('root-portal')
    )
  )
}

export default Modal
