import Skeleton from "components/skeleton";

import styles from '../Authors.module.scss'

const AuthorSkeleton = () => (
  <div>
    <Skeleton className={styles.skeletonImage}></Skeleton>
    <Skeleton className={styles.skeletonName}></Skeleton>
    <Skeleton className={styles.skeletonDescription}></Skeleton>
  </div>

)

export default AuthorSkeleton
