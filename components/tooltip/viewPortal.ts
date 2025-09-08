import ReactDOM from 'react-dom'

const Portal = ({ children }) => {
  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(children, document.body)
  }
  return null
}

export default Portal
