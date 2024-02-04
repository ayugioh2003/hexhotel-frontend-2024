import Carousel from 'react-bootstrap/Carousel'

type CarouselWrapperProps = {
  imageUrlList: Room['imageUrlList'],
  imageStyle?: object,
  controls?: boolean
}

function carouselWrapper({ imageUrlList = [], imageStyle, controls = true }: CarouselWrapperProps) {
  return (
    <Carousel controls={controls}>
      {imageUrlList.map((url, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              src={url}
              className="d-block object-fit-cover"
              style={{ maxHeight: '450px', 'objectPosition': 'center', ...imageStyle }}
              alt="..."
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default carouselWrapper
