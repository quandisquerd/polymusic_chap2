
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../component/css/style.css'
import './layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSearchMutation } from '../api/music';
import Search from '../component/Search';
import { pause } from '../util/pause';

const WebsiteLayout = () => {
    const [data, setdata]: any = useState([])
    const [search, setsearch] = useState([])
    const [searchs, { isLoading: searchLoading }] = useSearchMutation()
    const [datasearch, setdatasearch] = useState([])
    const [showSearchResult, setShowSearchResult] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')!)
        setdata(user)
    }, [])
    const handleSearch = async (e: any) => {
        setShowSearchResult(true);
        e.preventDefault()
        setdatasearch([])
        searchs({ name: search })
            .unwrap()
            .then(async ({ data }) => {
                setdatasearch(data)

                await pause(500)
                navigate('/search')

            })
    }
    const isLogin = () => {
        const accesstoken = data ? data.token : undefined;
        if (accesstoken) {
            return (
                <><Link to="/profile" style={{ color: 'white' }}> <FontAwesomeIcon icon={faUser} /> {data?.user.name}</Link> </>
            )
        } else {
            return (
                <><Link to="/register" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faUserPlus} color='white' /> Register</Link>
                    <Link to="/login" style={{ color: 'white' }}> <FontAwesomeIcon icon={faSignInAlt} color='white' /> Login</Link></>
            );
        }

    }
    return (
        <>
            <header>
                <div className="header-area " style={{ backgroundColor: "black", }}>
                    <div id="sticky-header" className="main-header-area">
                        <div className="container-fluid"  >
                            <div className="header_bottom_border">
                                <div className="row align-items-center">
                                    <div className="col-xl-3 col-lg-2">
                                        <div className="logo">
                                            <a href="/" style={{ display: "flex" }}>
                                                <div className="loading" style={{ height: '90%' }}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <p style={{ color: 'white', fontSize: '25px', marginTop: '8px', fontWeight: 'bold', marginLeft: '-20px' }}>Ketamin</p>

                                                {/* <img src="https://res.cloudinary.com/dw6wgytc3/image/upload/v1691917796/DUAN/logo_xsyovs.png" alt="" /> */}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-7">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <input type="text" placeholder="Search ...." id="searchInput" onChange={(e: any) => setsearch(e.target.value)} />
                                                    <input type="button" value="Search" id="searchButton" onClick={handleSearch} />
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                                        <div className="social_icon text-right">
                                            <ul>
                                                {isLogin()}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
            {showSearchResult ? (
                <Search searchData={datasearch} loading={searchLoading} />
            ) : (
                <Outlet />
            )}


        </>
    )
}
export default WebsiteLayout