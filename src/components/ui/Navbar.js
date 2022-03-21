import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Navbar.css';
// Se instalo el paquete react-bootstrap
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { clearActiveSucursal } from '../../actions/sucursales';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const {name} = useSelector( state => state.auth );
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = () => {
    // console.log('click');
    dispatch(startLogout());
    dispatch(clearActiveSucursal());
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                setShowDropdown(false); 
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }

  const onSellClick = () => {
    navigate('/ventas');
  }


  return (  
    <>
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">

        
        
        <div>
          <button 
            variant="primary" 
            className="btn-sell mb-1 mt-1"
            onClick={onSellClick}
          >
            VENDER
          </button>
          <i className="fa-solid fa-bell icon-notification"></i>

          <div
            className="circle"
            onClick={() => setShowDropdown(true)}
          >
            <i className="fa-solid fa-user"></i>
            
          </div>
            {/* TODO: ver si se puede posicionar de una menor manera */}
            <Dropdown.Menu ref={wrapperRef} show={showDropdown} align="end" title="Dropdown end" id="dropdown-menu-align-end">
                <Dropdown.Header>{name}</Dropdown.Header>
                <Dropdown.Item eventKey="2" onClick={()=>console.log('accion 1')}>Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
        </div>
              
      </div>
    </nav>
    
    </> 
  )
}
