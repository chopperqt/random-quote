import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames'

import styles from './Tooltip.module.scss'

import { ITooltip } from './'

const DEFAULT_OFFSET_Y = 5

const Tooltip = ({
  className,
  children,
  position = 'left',
  text,
  offsetY = DEFAULT_OFFSET_Y,
}: ITooltip) => {
  const tooltipWrapRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [posY, setPosY] = useState<number>(0)
  const [posX, setPosX] = useState<number>(0)

  const handleShowTooltip = () => {
    tooltipRef.current?.classList.add('tooltip-in')
  }

  const handleHideTooltip = () => {
    tooltipRef.current?.classList.remove('tooltip-in')
  }

  useEffect(() => {
    if (tooltipWrapRef.current && tooltipRef.current) {
      const tooltipWrapHeight = tooltipWrapRef.current?.clientHeight
      const tooltipHeight = tooltipRef.current?.clientHeight
      const tooltipWrapWidth = tooltipWrapRef.current?.clientWidth
      const tooltipWidth = tooltipRef.current?.clientWidth

      tooltipWrapRef.current.addEventListener('mouseenter', handleShowTooltip)
      tooltipWrapRef.current.addEventListener('mouseleave', handleHideTooltip)

      if (position === 'top') {
        setPosY((tooltipWrapHeight - tooltipWrapHeight - tooltipHeight) - offsetY)
        setPosX(Math.round((tooltipWrapWidth - tooltipWidth) / 2))

        return

      }

      setPosY(Math.round((tooltipWrapHeight - tooltipHeight) / 2))
    }

    return () => {
      if (tooltipWrapRef.current && tooltipRef.current) {
        tooltipWrapRef.current.removeEventListener('mouseenter', handleShowTooltip)
        tooltipWrapRef.current.removeEventListener('mouseleave', handleHideTooltip)
      }
    }
  }, [])

  return (
    <div
      ref={tooltipWrapRef}
      className={cx(styles.wrap, className)}>
      {children}
      <div
        ref={tooltipRef}
        style={{
          top: `${posY}px`,
          right: `${posX}px`,
        }}
        className={cx(styles.tooltipWrap, `tooltip--${position}`)}
      >
        <div
          className={styles.tooltip}
        >
          {text}
        </div>
      </div>
    </div >
  );
}

export default Tooltip
