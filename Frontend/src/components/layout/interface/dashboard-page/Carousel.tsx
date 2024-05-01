import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import image1 from '/brand/library.jpg';
import image2 from '/brand/woman-reading.jpg';
import image3 from '/brand/woman-reading2.jpg';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Carousel() {
  return (
    <CCarousel controls indicators>
      <CCarouselItem style={{ height: '75vh' }}>
        <CImage className="d-block w-100 contain" src={image1} alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem style={{ height: '75vh' }}>
        <CImage className="d-block w-100 contain" src={image2} alt="slide 2" />
      </CCarouselItem>
      <CCarouselItem style={{ height: '75vh' }}>
        <CImage className="d-block w-100 contain" src={image3} alt="slide 3" />
      </CCarouselItem>
    </CCarousel>
  );
}
