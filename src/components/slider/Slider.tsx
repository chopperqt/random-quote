import Slider from 'react-slick'

const Component = ({
  children,
}: {
  children: any,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  }

  return (
    <Slider
      {...settings}
    >
      {children}
    </Slider>
  )
}

export default Component