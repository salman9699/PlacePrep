import React from 'react';
import './styles.css';
import MenuList from './MenuList';

const SideBar = ({ sidebarOpen, onClick }) => {
    return (
        <>
            {/* Will be visible on mobile */}
            <div className={sidebarOpen ? 'overlay sidebar-open' : 'overlay sidebar-close'} onClick={onClick} ></div>
            <div className={`sidebar-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-close'}`} >
                <div className='sidebar-header'>
                    <div className='logo'>
                        {/* <img src='assets/img/logo.png' />
                         */}
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path fill="none" d="M14.52,2.469H5.482c-1.664,0-3.013,1.349-3.013,3.013v9.038c0,1.662,1.349,3.012,3.013,3.012h9.038c1.662,0,3.012-1.35,3.012-3.012V5.482C17.531,3.818,16.182,2.469,14.52,2.469 M13.012,4.729h2.26v2.259h-2.26V4.729z M10,6.988c1.664,0,3.012,1.349,3.012,3.012c0,1.664-1.348,3.013-3.012,3.013c-1.664,0-3.012-1.349-3.012-3.013C6.988,8.336,8.336,6.988,10,6.988 M16.025,14.52c0,0.831-0.676,1.506-1.506,1.506H5.482c-0.831,0-1.507-0.675-1.507-1.506V9.247h1.583C5.516,9.494,5.482,9.743,5.482,10c0,2.497,2.023,4.52,4.518,4.52c2.494,0,4.52-2.022,4.52-4.52c0-0.257-0.035-0.506-0.076-0.753h1.582V14.52z"></path>
                        </svg>
                    </div>
                    <span className='header-text'>Dashboard Kit</span>
                </div>
                <div className='sidebar-menu'>
                    <MenuList />
                    {/* <ul className='menu-list'>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-tachometer menu-icon' ></i>
                                <span className='menu-text' >Dashboard</span>
                            </a>
                        </li>
                        <li className='menu-item dropdown-menu-item'>
                            <a href='/'>
                                <i className='fa fa-pie-chart menu-icon' ></i>
                                <span className='menu-text' >Overview</span>
                            </a>
                            <div className='submenu-list'>
                                <ul  >
                                    <li className='submenu-item active'>
                                        <a href='/'>
                                            <i className='fa fa-pie-chart menu-icon' ></i>
                                            <span className='menu-text' >submenu 1</span>
                                        </a>
                                    </li>
                                    <li className='submenu-item'>
                                        <a href='/'>
                                            <i className='fa fa-pie-chart menu-icon' ></i>
                                            <span className='menu-text' >Submenu 2</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-ticket menu-icon' ></i>
                                <span className='menu-text' >Tickets</span>
                            </a>
                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-lightbulb-o menu-icon' ></i>
                                <span className='menu-text' >Ideas</span>
                            </a>
                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-users menu-icon' ></i>
                                <span className='menu-text' >Contacts</span>
                            </a>
                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-user menu-icon' ></i>
                                <span className='menu-text' >Agents</span>
                            </a>
                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-book menu-icon' ></i>
                                <span className='menu-text' >Articles</span>
                            </a>
                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-cc-stripe menu-icon' ></i>
                                <span className='menu-text' >Subscription</span>
                            </a>
                        </li>
                        <hr />
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-cc-stripe menu-icon' ></i>
                                <span className='menu-text' >Subscription</span>
                            </a>
                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-cc-stripe menu-icon' ></i>
                                <span className='menu-text' >Subscription</span>
                            </a>
                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-cc-stripe menu-icon' ></i>
                                <span className='menu-text' >Subscription</span>
                            </a>
                        </li>
                        <li className='menu-item'>
                            <a href='/'>
                                <i className='fa fa-cc-stripe menu-icon' ></i>
                                <span className='menu-text' >Subscription</span>
                            </a>
                        </li>
                    </ul> */}
                </div>
                {/* <div className='sidebar-footer'>

                </div> */}
            </div>
            {/* <div id='sidebar-btn' onClick={toggleSidebarBtn} >
                <i className='fas fa-bars menu-icon' ></i>
            </div> */}
        </>
    );
};

export default SideBar;
