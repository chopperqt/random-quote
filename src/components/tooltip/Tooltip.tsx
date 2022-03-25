import React, { useRef } from 'react';
import cx from 'classnames'

import useTooltip from './hooks/useTooltip';

import styles from './Tooltip.module.scss'

import { ITooltip } from './'

const Tooltip = ({
  className,
  children,
  position = 'left'
}: ITooltip) => {
  const tooltipWrapRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const {
    styleCenter,
  } = useTooltip({
    position,
    tooltipWrap: tooltipWrapRef.current,
    tooltip: tooltipRef.current,
  })

  return (
    <div
      ref={tooltipWrapRef}
      className={cx(styles.wrap, className)}>
      {children}
      <div
        style={{ top: `${styleCenter}px` }}
        ref={tooltipRef}
        className={cx(styles.tooltipWrap, `tooltip--${position}`)}
      >
        <div
          className={styles.tooltip}
        >
          Цитаты
        </div>
      </div>
    </div >
  );
}

export default Tooltip
