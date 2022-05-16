import { Container } from 'react-bootstrap';

const Announcement = () => {
  return (
    <Container fluid
      className="announcement fixed-top d-flex justify-content-center align-items-center text-white p-1" >
      <p className='mb-0 small'>Orders over $150 get FREE Shipping!</p>
    </Container>
  )
}

export default Announcement;