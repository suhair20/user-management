 import React from 'react'
import {Container ,Row, Col} from 'react-bootstrap'

function FormContainer({children}) {
  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">

    <Row className="justify-content-md-center">
    <Col xs={12} md={12} lg={12} className="Card">

        {children}
      </Col>
    </Row>
  </Container>
  )
}

export default FormContainer
