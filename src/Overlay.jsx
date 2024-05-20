import { Logo } from '@pmndrs/branding'
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from 'react-icons/ai'
import { state } from './store'
import { useSnapshot } from 'valtio'
import { motion, AnimatePresence } from 'framer-motion'

export const Overlay = () => {
  const snap = useSnapshot(state)
  const transition = { type: 'string', duration: 1 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }

  return (
    <div className="container">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -120 }}
        transition={transition}
        animate={{ opacity: 1, y: 0 }}>
        <Logo width="40" height="40" />
        <div>
          <AiOutlineShopping size="3em" />
        </div>
      </motion.header>

      <AnimatePresence>
        {/* BODY */}
        {snap.intro ? (
          <Intro config={config} />
        ) : (
          <Customizer config={config} />
        )}
      </AnimatePresence>
    </div>
  )
}

export const Intro = (props) => {
  const snap = useSnapshot(state)

  return (
    <motion.section {...props.config}>
      <div className="section--container">
        <div>
          <h1>LET'S DO IT.</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <button
              onClick={() => {
                state.intro = false
              }}
              type="button"
              style={{ background: 'black' }}>
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export const Customizer = (props) => {
  const snap = useSnapshot(state)

  const downloadImage = () => {
    const link = document.createElement('a')
    const canvas = document.querySelector('canvas')
    const dataUrl = canvas.toDataURL('image/png')

    link.setAttribute('download', 'shirt.png')
    link.setAttribute(
      'href',
      dataUrl.replace('image/png', 'image/octet-stream')
    )
    link.click()

    link.remove()
  }

  return (
    <motion.section {...props.config}>
      <div className="customizer">
        <div className="color-options">
          {snap.colors.map((color) => (
            <div
              onClick={() => (state.selectedColor = color)}
              key={color}
              className="circle"
              style={{ background: color }}></div>
          ))}
        </div>
        <div className="decals">
          <div className="decals--container">
            {snap.decals.map((decal) => (
              <div
                onClick={() => (state.selectedDecal = decal)}
                key={decal}
                className="decal">
                <img src={decal + '_thumb.png'} alt="brand" />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={downloadImage}
          className="share"
          style={{ background: 'black' }}>
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>
        <button
          onClick={() => {
            state.intro = true
          }}
          className="exit"
          style={{ background: 'black' }}>
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
      </div>
    </motion.section>
  )
}
