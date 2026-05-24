import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DispatchClaude from './pages/DispatchClaude'
import LiftAppPrivacyPolicy from './pages/LiftAppPrivacyPolicy'
import Redirect from './pages/Redirect'
import './index.css'

const shortLinks: Record<string, string> = {
  '/y3c4gz':
    'https://guide.vico.patrykandpatrick.com/views/cartesian-charts/candlestickcartesianlayer#transaction.candlestickseries',
  '/r8d20v':
    'https://guide.vico.patrykandpatrick.com/compose/cartesian-charts/candlestickcartesianlayer#transaction.candlestickseries',
  '/eji9zq':
    'https://guide.vico.patrykandpatrick.com/views/cartesian-charts/columncartesianlayer#transaction.columnseries',
  '/3aqy4o':
    'https://guide.vico.patrykandpatrick.com/compose/cartesian-charts/columncartesianlayer#transaction.columnseries',
  '/vmml6t':
    'https://guide.vico.patrykandpatrick.com/views/cartesian-charts/linecartesianlayer#transaction.lineseries',
  '/z5ah6v':
    'https://guide.vico.patrykandpatrick.com/compose/cartesian-charts/linecartesianlayer#transaction.lineseries',
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dispatch-claude" element={<DispatchClaude />} />
        <Route
          path="/liftapp-privacy-policy"
          element={<LiftAppPrivacyPolicy />}
        />
        <Route
          path="/vico/releases/:version"
          element={
            <Redirect
              build={({ version }) =>
                `https://archive.patrykandpatrick.com/vico/releases/${version}`
              }
            />
          }
        />
        {Object.entries(shortLinks).map(([path, url]) => (
          <Route key={path} path={path} element={<Redirect to={url} />} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
