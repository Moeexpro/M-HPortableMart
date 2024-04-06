import react from 'react'
import {Link} from 'react-router-dom'
import './Fo.css'

export default function Footer ()
{
    return(
        <div>
    
        <div className="row">
        <div className="col-sm-6 col-md-4 footer-navigation">
            <h3><a href="#">M<span>& H</span></a></h3>
            <p className="links"><Link to="/">Home</Link><strong> · </strong> · <Link to="/Graphic/" style={{fontWeight:'bold',color:'red'}}>Graphic Cards</Link><strong> · </strong><Link to="/Laptops/">Laptops</Link><strong> ·</strong><Link to="/SmartPhones/">SmartPhones</Link><strong>·</strong><Link to="/UsedItems/">UsedItems</Link><strong> · </strong><Link to="/Contact/" style={{fontWeight:'bold',color:'red'}}>Contact</Link><strong> · </strong><Link to="/About/">About</Link></p>
            <p className="company-name">M & H © 2021</p>
        </div>
        <div className="col-sm-6 col-md-4 footer-contacts">
            <div><span className="fa fa-map-marker footer-contacts-icon"> </span>
                <p><span className="new-line-span">MM ALAM ROAD</span>Lhr, PAKISTAN</p>
            </div>
            <div><i className="fa fa-phone footer-contacts-icon"></i>
                <p className="footer-center-info email text-left"> +92 9485045958</p>
            </div>
            <div><i className="fa fa-envelope footer-contacts-icon"></i>
                <p> <a href="#" target="_blank">support@m&h.com</a></p>
            </div>
        </div>
        <div className="clearfix"></div>
        <div className="col-md-4 footer-about">
            <h4>About the company</h4>
            <p>M & H is the best place for wide and quality range of technological products</p>
            <div className="social-links social-icons"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a><a href="#"><i class="fa fa-github"></i></a></div>
        </div>
    </div>
    
    </div>
    )
}