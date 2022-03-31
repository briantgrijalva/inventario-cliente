import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { Navbar } from './Navbar';

export const Sidebar = () => {

  const headerpdRef = useRef();
  const bodypdRef = useRef();
  const togleRef = useRef();
  const navRef = useRef();
  const dasboardRef = useRef();
  // const comprasRef = useRef();
  const ventasRef = useRef();
  // const gastosRef = useRef();
  // const devolucionRef = useRef();
  const productosRef = useRef();
  // const personasRef = useRef();
  // const informesRef = useRef();
  const sucursalRef = useRef();
  // const ajustesRef = useRef();

  const location = useLocation();

  useEffect(() => {
    
    const link = [
      dasboardRef.current,
      // comprasRef.current,
      ventasRef.current,
      // gastosRef.current,
      // devolucionRef.current,
      productosRef.current,
      // personasRef.current,
      // informesRef.current,
      // ajustesRef.current, 
      sucursalRef.current
    ];

    

    link.filter(lnk => location.pathname === lnk.pathname)
    .map(lnk => (
      lnk.classList.add('active')))

    link.filter(lnk => location.pathname !== lnk.pathname)
    .map(lnk => (
      lnk.classList.remove('active')))  

    
  }, [location]);

  useEffect(() => {
    
    if (location.pathname === '/nuevaSucursal' || location.pathname === '/verSucursal') {
      sucursalRef.current.classList.add('active');
    } else if (location.pathname === '/nuevoProducto') {
      productosRef.current.classList.add('active');
    }
  }, [location])

  const handleSidebar = () => {

    //Getting node element
    const headerpd = headerpdRef.current;
    const bodypd = bodypdRef.current;
    const togglebtn = togleRef.current;
    const nav = navRef.current;

    // show navbar
    nav.classList.toggle('show');
    // change icon
    togglebtn.classList.toggle('fa-times');
    // add padding to body
    bodypd.classList.toggle('body-pd');
    // add padding to header
    headerpd.classList.toggle('body-pd');
  }

  return (  
    <>
    <div className='body' id="body-pd" ref={bodypdRef}>
      <header className="header" id="header" ref={headerpdRef}>
        
          <div className="header_toggle mt-2"> <i className='fas fa-bars' id="header-toggle" ref={togleRef}
            onClick={handleSidebar}
          ></i> 
          
          </div>
          <Navbar />
          {/* <div class="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt=""/> </div> */}
          
      </header>
      <div className="l-navbar" id="nav-bar" ref={navRef}>
          <nav className="nav">
              <div>

              {/* <i class="fa-solid fa-grid-2"></i> */}
                <a href="!#" className="nav_logo">
                    <i className='fas fa-skull nav_logo-icon'></i> <span className="nav_logo-name">SoftTunix </span> 
                  </a>

                  <div className="nav_list">
                    <Link to={'dashboard'} ref={dasboardRef} className='nav_link'> <i className='fas fa-th-large nav_icon'></i> <span className="nav_name">Dashboard</span> </Link> 
                    <Link to={'ventas'} ref={ventasRef} className="nav_link"> <i className='fas fa-cash-register nav_icon'></i> <span className="nav_name">Ventas</span> </Link> 
                    {/* <Link to={'compras'}  ref={comprasRef} className="nav_link"> <i className='fas fa-shopping-bag nav_icon'></i> <span className="nav_name">Compras</span> </Link>  */}
                    {/* <Link to={'gastos'}  ref={gastosRef} className="nav_link"> <i className='fas fa-coins nav_icon'></i> <span className="nav_name">Gastos</span> </Link>  */}
                    {/* <Link to={'devoluciones'}  ref={devolucionRef} className="nav_link"> <i className='fas fa-exchange nav_icon'></i> <span className="nav_name">Devoluciones</span> </Link>  */}
                    <Link to={'productos'}  ref={productosRef} className="nav_link"> <i className='fas fa-box-open nav_icon'></i> <span className="nav_name">Productos</span> </Link> 
                    {/* <Link to={'personas'}  ref={personasRef} className="nav_link"> <i className='fas fa-users nav_icon'></i> <span className="nav_name">Personas</span> </Link>  */}
                    {/* <Link to={'informes'} ref={informesRef} className="nav_link"> <i className='fas fa-chart-bar nav_icon'></i> <span className="nav_name">Informes</span> </Link>  */}
                    <Link to={'sucursales'} ref={sucursalRef} className="nav_link" > <i className='fas fa-store-alt nav_icon'></i> <span className="nav_name">Sucursales</span> </Link> 
                  </div>
              </div> 
              {/* <Link to={'ajustes'}  ref={ajustesRef} className="nav_link"> <i className='fas fa-cog nav_icon'></i> <span className="nav_name">Ajustes</span> </Link> */}
          </nav>
      </div>
    {/* <!--Container Main start--> */}
    {/* <div className="height-100 bg-light">
        <h4>Main Components</h4> */}
        {/* Router */}
    {/* </div> */}
    {/* <!--Container Main end--> */}
    </div>
    </>
  )
}


