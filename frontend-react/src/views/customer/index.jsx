import SidebarMenu from "../../components/SidebarMenu";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";

const CustomerIndex = () => {
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
    <div className="container mb-5 mt-5 wrapper-authenticated">
      <div className="row">
        <SidebarMenu />
        <div className="card card-customer border-0 shadow-lg rounded">
          <div className="card-header">
            <span>Our Catalogues</span>
          </div>
          <div className="card-body" style={{ position: "relative" }}>
            <div className="carousel-bx">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerIndex;
