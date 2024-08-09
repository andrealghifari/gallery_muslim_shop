import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import bajuKoko from "../../assets/koko.png";
import kurma from "../../assets/kurma.png";
import sarungBhs from "../../assets/sarung_bhs.png";
import sarung from "../../assets/sarung.png";

const GallerySlider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      swipeable: true,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      swipeable: true,
    },
  };
  return (
    <Container>
      <Row>
        <Col>
          <Carousel
            responsive={responsive}
            infinite={true}
            className="image-slider"
            autoPlay
            autoPlaySpeed={2000}
          >
            <div className="item">
              <div className="item-list">
                <img src={bajuKoko} alt="" />
              </div>
              <div className="item-desc">Aneka Koko Pria</div>
            </div>
            <div className="item">
              <div className="item-list">
                <img src={kurma} alt="" />
              </div>
              <div className="item-desc">Kurma Super Al Amwa</div>
            </div>
            <div className="item">
              <div className="item-list">
                <img src={sarungBhs} alt="" />
              </div>
              <div className="item-desc">Sarung BHS Excellent</div>
            </div>
            <div className="item">
              <div className="item-list">
                <img src={sarung} alt="" />
              </div>
              <div className="item-desc">Sarung Gajah Duduk</div>
            </div>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};


export default GallerySlider;