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
    tooltipHeight
  } = useTooltip({
    tooltip: tooltipWrapRef.current,
  })

  console.log(tooltipHeight)

  return (
    <div
      ref={tooltipWrapRef}
      className={cx(styles.wrap, className)}>
      {children}
      <div
        ref={tooltipRef}
        className={cx(styles.tooltip, `tooltip--${position}`)}
      >
        awdawdaw
      </div>
    </div>
  );
}

export default Tooltip
