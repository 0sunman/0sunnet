import { PropTypes } from "prop-types";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Slick from 'react-slick';
import {Global} from './style'
import ImagesZoom from "../imageZoom";
/**
 * text-center
 * inline-block text-center color-white font-xl w-18 h-7 leading-8 bg-gray_2 rounded-3xl
 * 
*/

const ImageZoom = ({images,onClose}) =>{
    const [currentSlide, setCurrentSlide] = useState(0);
    return (<div className="fixed top-0 left-0 right-0 bottom-0 z-50">
        <Global/>
        <header className="flex justify-center items-center p-0 h-11 bg-white text-center">
            <h1 className="m-0 text-base color-black leading-5">상세 이미지</h1>
            <button onClick={onClose} className="absolute right-0 top-0 p-3.5 leading-4 cursor-pointer">X</button>
        </header>
        <div className="h-calc_100_44 bg-gray_1">
            <div>
                <Slick
                    initialSlide={0}
                    afterChange={(slide)=>setCurrentSlide(slide)}
                    infinite
                    arrows={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                >
                    {images.map((v)=>(
                        <div key={v.src} className="p-8 text-center">
                            <img src={v.src} alt={v.src} className="mx-auto "/>
                        </div>
                    ))}
                </Slick>
                <div className="text-center">
                    <div className="inline-block text-center bg-white font-xl w-18 h-7 leading-7 px-6 bg-gray_2 rounded-xl mb-5">
                        {currentSlide + 1} {' '} / {images.length}
                    </div>
                </div>
            </div>
        </div>
    </div>)

}

ImageZoom.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired
}

export default ImageZoom;