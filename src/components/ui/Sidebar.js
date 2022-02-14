import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { Navbar } from './Navbar';

export const Sidebar = () => {

  const headerpdRef = useRef();
  const bodypdRef = useRef();
  const togleRef = useRef();
  const navRef = useRef();

  document.addEventListener("DOMContentLoaded", function() {

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link');
    
    function colorLink(){
      if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'));
        this.classList.add('active');
      }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink));
    
    // Your code to run since DOM is loaded and ready
    }
  );

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
                    <Link to={'ventas'} className="nav_link active"> <i className='fas fa-th-large nav_icon'></i> <span className="nav_name">Dashboard</span> </Link> 
                    <a href="!#" className="nav_link"> <i className='fas fa-cash-register nav_icon'></i> <span className="nav_name">Ventas</span> </a> 
                    <a href="!#" className="nav_link"> <i className='fas fa-shopping-bag nav_icon'></i> <span className="nav_name">Compras</span> </a> 
                    <a href="!#" className="nav_link"> <i className='fas fa-coins nav_icon'></i> <span className="nav_name">Gastos</span> </a> 
                    <a href="!#" className="nav_link"> <i className='fas fa-exchange nav_icon'></i> <span className="nav_name">Devoluciones</span> </a> 
                    <a href="!#" className="nav_link"> <i className='fas fa-box-open nav_icon'></i> <span className="nav_name">Productos</span> </a> 
                    <a href="!#" className="nav_link"> <i className='fas fa-users nav_icon'></i> <span className="nav_name">Personas</span> </a> 
                    <a href="!#" className="nav_link"> <i className='fas fa-chart-bar nav_icon'></i> <span className="nav_name">Informes</span> </a> 
                    <Link to={'sucursales'} className="nav_link"> <i className='fas fa-store-alt nav_icon'></i> <span className="nav_name">Sucursales</span> </Link> 
                  </div>
              </div> <a href="!#" className="nav_link"> <i className='fas fa-cog nav_icon'></i> <span className="nav_name">Ajustes</span> </a>
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


