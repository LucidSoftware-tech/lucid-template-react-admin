import QueryProvider from './providers/QueryProvider'
import Router from './router'
import './i18n'

function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  )
}

export default App
