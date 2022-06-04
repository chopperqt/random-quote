import cx from 'classnames'

import styles from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  classNameWrap?: string
  classNameActivity?: string
}
const Skeleton = ({
  className,
  classNameWrap,
  classNameActivity,
}: SkeletonProps) => (
  <div className={cx(styles.skeleton, className)}>
    <div className={cx(styles.wrap, classNameWrap)}>
      <div className={cx(styles.activity, classNameActivity)} />
    </div>
  </div>
);

export default Skeleton;