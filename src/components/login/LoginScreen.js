import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import '../../styles/LoginScreen.css';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: 'admin@admin.com',
    lPassword: '123456'
  });

  const {lEmail, lPassword} = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(lEmail, lPassword));

    // console.log(formLoginValues);
  }


  return (
    <div className='container-sucursales'>
        
        <Container className='div-card pt-3'>
            
            <Row>
                <Col xs={6} md={6}>
                    
                  
                </Col>
                <Col xs={6} md={6}>

                  
                    
                </Col>
            </Row>

            <Row>
                <Col xs={6} md={4}></Col>
                <Col xs={12} md={4} className='card-shadow'>
                  <form onSubmit={handleLogin}>
                  <label htmlFor="email" className="form-label mt-4">Email</label>
                        <div className="input-group mt-0">
                            <input 
                                type='text' 
                                name='lEmail'
                                value={lEmail}
                                onChange={handleLoginInputChange}
                                className="form-control" 
                                placeholder="Email"
                            />
                            
                        </div>
                            <label htmlFor="password" className="form-label mt-4">Password</label>
                        <div className="input-group mt-0">
                            <input 
                                type='password' 
                                name='lPassword'
                                value={lPassword}
                                onChange={handleLoginInputChange} 
                                className="form-control" 
                                placeholder="Password"
                            />
                        </div>
                        
                        <button variant="primary" type='submit' className="btn-login mb-4 mt-4">
                            LOGIN
                        </button>

                        
                  </form>
                </Col>
                <Col xs={6} md={4}></Col>
            </Row>

            {/* <Row className='paginacion'>      
                
                <Col xs={3} md={2} className='mb-2 mt-2' >
                   
                    
                </Col>
                <Col xs={2} md={6}>
                   
                    
                </Col>
                
                <Col xs={7} md={4}>

                </Col>
                
            </Row> */}
            
        </Container>
    </div>
  )
}
