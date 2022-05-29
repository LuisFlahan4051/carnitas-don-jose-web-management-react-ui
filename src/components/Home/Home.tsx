import './Home.scss'
// import { useState, useEffect } from 'react';
 import IconBackgroundDark from './imgs/LogoFondoDark.svg'
 import IconBackground from './imgs/LogoFondoWite.svg'

function Home(props: {darkTheme: boolean}) {


    /* -------------- RENDER --------------*/
    return (
        <div className="Home">
            <div className='main_background'>
                <img src={props.darkTheme ? IconBackgroundDark : IconBackground} alt="icon background" className='background__icon' />
            </div>

            <div className='options_container'>
                <div className='option_users'>hola</div>
                <div className='option_users'>hola</div>
            </div>
        </div>
    );
}

export default Home;