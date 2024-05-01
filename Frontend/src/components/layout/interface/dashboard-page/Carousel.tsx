import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react';
import image1 from '../../../../assets/images/Coming-Soon copy.jpeg';
import image2 from '../../../../assets/images/Coming-Soon copy.jpeg';
import image3 from '../../../../assets/images/Coming-Soon copy.jpeg';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Carousel() {
  return (
    <CCarousel controls indicators style={{marginBottom: "130px"}}>
      <CCarouselItem style={{ height: '75vh' }}>
        <CImage className="d-block w-100 contain" src={image1} alt="slide 1" />
        <CCarouselCaption className="d-none d-md-block">
          <h5>First slide label</h5>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem style={{ height: '75vh' }}>
        <CImage className="d-block w-100 contain" src={image2} alt="slide 2" />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Second slide label</h5>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem style={{ height: '75vh' }}>
        <CImage className="d-block w-100 contain" src={image3} alt="slide 3" />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Third slide label</h5>
        </CCarouselCaption>
      </CCarouselItem>
    </CCarousel>
  );
}
