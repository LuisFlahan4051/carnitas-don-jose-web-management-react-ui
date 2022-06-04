import './Loader.scss'
import logo from './img/LogoCV1.svg'

function Loader() {


    /* -------------- RENDER --------------*/
    return (
        <div className="Loader">
            <img src={logo} alt="icon loader" className='loader__icon' />
            <div className='loader__bar'>
                <div className='bar_field'></div>
            </div>
        </div>
    );
}

export default Loader;