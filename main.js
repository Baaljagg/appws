import './style.css'
import './anim.scss'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import WaveSurfer from 'wavesurfer.js'

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#4F4A85',
  progressColor: '#383351',
  url: '/mp3/disenchantment.mp3',
  height: 128,
  fillParent: true,
  hideScrollbar: false,
  minPxPerSec: 1,
  mediaControls: true,
  
})



wavesurfer.once('decode', () => {
  const slider = document.querySelector('input[type="range"]')

  slider.addEventListener('input', (e) => {
    const minPxPerSec = e.target.valueAsNumber
    wavesurfer.zoom(minPxPerSec)
  })
})

var counting = 0

const zoomIn = document.querySelector('#zoomIn')
wavesurfer.once('decode', () => {
  zoomIn.onclick = () => {
    if(counting == 150)
      return
    counting += 30
    const minPxPerSec = counting
    wavesurfer.zoom(minPxPerSec)
  }
})

const zoomOut = document.querySelector('#zoomOut')
wavesurfer.once('decode', () => {
  zoomOut.onclick = () => {
    if(counting == 0)
      return
    counting -= 30
    const minPxPerSec = counting
    wavesurfer.zoom(minPxPerSec)
  }
})


wavesurfer.on('timeupdate', (currentTime) => {
  document.getElementById("time").innerHTML = 'Time ' + currentTime + ' s'
})


const forwardButton = document.querySelector('#forward')
const backButton = document.querySelector('#backward')

wavesurfer.once('decode', () => {
  forwardButton.onclick = () => {
    wavesurfer.skip(5)
  }

  backButton.onclick = () => {
    wavesurfer.skip(-5)
  }
})
