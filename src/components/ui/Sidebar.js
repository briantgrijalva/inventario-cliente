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
      togglebtn.classList.toggle('bx-x');
      // add padding to body
      bodypd.classList.toggle('body-pd');
      // add padding to header
      headerpd.classList.toggle('body-pd');
   }

  return (  
    <>
    
    <div className='body' id="body-pd" ref={bodypdRef}>
     <header className="header" id="header" ref={headerpdRef}>
       
        <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle" ref={togleRef}
          onClick={handleSidebar}
        ></i> 
        
        </div>
        <Navbar />
        {/* <div class="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt=""/> </div> */}
        
    </header>
    <div className="l-navbar" id="nav-bar" ref={navRef}>
        <nav className="nav">
            <div>

               <a href="!#" className="nav_logo">
                  <i className='bx bx-layer nav_logo-icon'></i> <span className="nav_logo-name">SoftTunix </span> 
                </a>

                <div className="nav_list"> 
                  <Link to={'ventas'} className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </Link> 
                  <a href="!#" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Users</span> </a> 
                  <a href="!#" className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Messages</span> </a> 
                  <a href="!#" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </a> 
                  <a href="!#" className="nav_link"> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Files</span> </a> 
                  <a href="!#" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span> </a> 
                </div>
            </div> <a href="!#" className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> </a>
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


