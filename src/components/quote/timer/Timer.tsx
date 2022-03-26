import React, { useEffect, useRef } from 'react'

import './Timer.scss'

const Timer = () => {
  function progressView() {
    let diagramBox = document.querySelectorAll('.diagram.progress');
    diagramBox.forEach((box) => {
      // @ts-ignore
      let deg = (360 * box.dataset.percent as any / 100) + 180;

      // @ts-ignore
      if (box.dataset.percent >= 50) {
        box.classList.add('over_50');
      } else {
        box.classList.remove('over_50');
      }
      // @ts-ignore
      box.querySelector('.piece.right').style.transform = 'rotate(' + deg + 'deg)';
    });
  }

  function timer(seconds: number) {
    let diagramBox = document.querySelector('.diagram.timer');
    // @ts-ignore
    seconds = seconds || diagramBox.dataset.seconds;

    // @ts-ignore
    let deg = (360 * seconds / diagramBox.dataset.seconds) + 180;

    // @ts-ignore
    if (seconds >= diagramBox.dataset.seconds / 2) {
      // @ts-ignore
      diagramBox.classList.add('over_50');
    } else {
      // @ts-ignore
      diagramBox.classList.remove('over_50');
    }
    //@ts-ignore
    diagramBox.querySelector('.piece.right').style.transform = 'rotate(' + deg + 'deg)';

    // @ts-ignore
    diagramBox.querySelector('.text b').innerText = seconds;

    setTimeout(function () {
      timer(seconds - 1);
    }, 1000);
  }


  useEffect(() => {
    progressView()
    timer(1000)
  }, [])

  return (
    <div
      className="diagram progress"
      data-percent="18"
    >
      <div className="piece left"></div>
      <div className="piece right"></div>
      <div className="text">
        <div>
          <b>18</b>
          <span>PERCENT</span>
        </div>
      </div>
    </div>
  )
}

export default Timer