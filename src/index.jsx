import { createRoot } from 'react-dom/client'
import './styles.css'

import { App as Canvas } from './Canvas'
import { Overlay } from './Overlay'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <>
    <Canvas />
    <Overlay />
  </>
)
