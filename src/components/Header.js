import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Searchbar from './Blog/Searchbar';
import ListIcon from '@mui/icons-material/List';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArticleIcon from '@mui/icons-material/Article';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CommentIcon from '@mui/icons-material/Comment';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import SettingsIcon from '@mui/icons-material/Settings';
import TabIcon from '@mui/icons-material/Tab';
import useAuth from '../Hooks/useAuth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = useAuth();
    // const id = useParams();
    const toggleSlider = () => {
        setIsSliderOpen(!isSliderOpen);
    };

    const handleOpenPage = () => {
        navigate('/blog')
        setIsSliderOpen(!isSliderOpen);
    }
    const movePage = () => {
        navigate('/dashboard')
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('username');
        sessionStorage.removeItem('username');
        navigate('/login');
    }
    return (
        <div
            className={
                location.pathname === '/login' || location.pathname === '/'
                    ? 'bg-gradient-to-t to-blue-700 from-blue-400 p-5 h-[33vh]'
                    : 'bg-gray-100 p-5 text-gray-700'
            }
        >
            <div className="flex justify-center font-medium text-white items-center">
                {location.pathname === '/login' ? (
                    'Please Login'
                ) : location.pathname === '/' ? (
                    'Please Register'
                ) : (
                    <div className="w-full flex items-center">
                        {
                            location.pathname === '/blog' ? (
                                <ArrowBackIcon
                                    className="text-gray-600 mr-5 flex items-center cursor-pointer"
                                    onClick={movePage}
                                />
                            ) : (
                                <ListIcon
                                    className="text-gray-600 mr-5 flex items-center cursor-pointer"
                                    onClick={toggleSlider}
                                />
                            )
                        }

                        <Searchbar />
                        <AccountCircleIcon className="text-gray-600 mx-5 flex items-center" />
                        <span className="text-gray-700 w-1/6 flex-wrap" onClick={handleLogout}>{username}</span>
                    </div>
                )}
            </div>

            {location.pathname === '/login' || location.pathname === '/' ? (
                <div className={'flex justify-between text-3xl font-medium text-white items-center'}>
                    <Link to="/login">Login</Link>
                    <Link to="/">Register</Link>
                </div>
            ) : (
                <div></div>
            )}

            {/* Slider (Sidebar) */}
            {isSliderOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50">
                    <div className="fixed left-0 top-0 w-64 h-full bg-white p-5 shadow-lg">
                        <button
                            className="absolute top-4 right-4 text-xl text-gray-700"
                            onClick={toggleSlider}
                        >
                            <KeyboardArrowDownIcon />
                        </button>
                        <div className="space-y-4 pb-5">
                            <div>creater</div>
                            <button className=' px-4 py-2 border bg-white rounded-full shadow-md text-amber-500 font-medium' onClick={handleOpenPage}>
                                NEW POST
                            </button>
                        </div>
                        <hr className=' border' />
                        <ul className=' grid gap-2 mt-5 '>
                            <li className='hover:bg-slate-100 p-2'><ArticleIcon />  Posts</li>
                            <li className='hover:bg-slate-100 p-2'><EqualizerIcon /> Stats</li>
                            <li className='hover:bg-slate-100 p-2'><CommentIcon /> Comments</li>
                            <li className='hover:bg-slate-100 p-2'><CurrencyExchangeIcon /> Earning</li>
                            <li className='hover:bg-slate-100 p-2'><AutoStoriesIcon /> Pages</li>
                            <li className='hover:bg-slate-100 p-2'><FormatPaintIcon /> Theme</li>
                            <li className='hover:bg-slate-100 p-2'><SettingsIcon /> Setting</li>
                            <hr />
                            <li className='hover:bg-slate-100 p-2'><TabIcon /> View blogs</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
