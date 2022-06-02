import Spin from 'components/spin'
import LazyLoad from 'react-lazyload'

import styles from './Img.module.scss'

const PlaceholderComponent = (
  <div style={{ color: '#000 !important', width: '200px', height: '200px', background: '#c7c7c7' }} />
)

interface ImgProps extends React.ComponentProps<'img'> {
  height: number,
}
const Img = ({
  height,
  ...props
}: ImgProps) => (
  <div style={{ color: '#000 !important', width: '200px', background: '#c7c7c7', height: '200px' }}>
    <LazyLoad
      height={height}
      placeholder={PlaceholderComponent}
    >
      <img
        {...props}
        alt={props.alt}
      />
    </LazyLoad>
  </div>

)

export default Img