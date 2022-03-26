import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames'

import useTooltip from './hooks/useTooltip';

import styles from './Tooltip.module.scss'

import { ITooltip } from './'

const Tooltip = ({
  className,
  children,
  position = 'left',
  text,
}: ITooltip) => {
  const tooltipWrapRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [posY, setPosY] = useState<number>(0)
  let styleCenter = ((tooltipWrapRef.current?.clientHeight || 0) - (tooltipWrapRef.current?.clientHeight || 0)) / 2

  const handleShowTooltip = () => {
    tooltipRef.current?.classList.add('tooltip-in')
  }

  const handleHideTooltip = () => {
    tooltipRef.current?.classList.remove('tooltip-in')
  }

  useEffect(() => {
    if (tooltipWrapRef.current && tooltipRef.current) {
      setPosY((tooltipWrapRef.current?.clientHeight - tooltipRef.current?.clientHeight) / 2)

      tooltipWrapRef.current.addEventListener('mouseenter', handleShowTooltip)
      tooltipWrapRef.current.addEventListener('mouseleave', handleHideTooltip)
    }


    return () => {
      tooltipWrapRef.current?.removeEventListener('mouseenter', handleShowTooltip)
      tooltipWrapRef.current?.removeEventListener('mouseleave', handleHideTooltip)
    }
  }, [])


  return (
    <div
      ref={tooltipWrapRef}
      className={cx(styles.wrap, className)}>
      {children}
      <div
        ref={tooltipRef}
        style={{ top: `${posY}px` }}
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
