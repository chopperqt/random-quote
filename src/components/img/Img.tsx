import { LazyLoadImage } from 'react-lazy-load-image-component'

import styles from './Img.module.scss'

const PlaceholderComponent = () => (
  <div style={{ color: '#000 !important', width: '200px', height: '200px', background: '#c7c7c7' }} />
)

interface ImgProps {
  height: number
  src: string | ArrayBuffer
  alt: string
  className?: string
}
const Img = ({
  height,
  src,
  alt,
  className,
}: ImgProps) => (
  <LazyLoadImage
    className={className}
    height={height}
    placeholder={<PlaceholderComponent />}
    effect="blur"
    src={src.toString()}
    alt={alt}
  />
)

export default Img