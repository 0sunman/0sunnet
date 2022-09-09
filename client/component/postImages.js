import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import ImagesZoom from "./imagesZoom/index.js"

const PostImages = ({images}) =>{
    const [showImagesZoom,setShowImagesZoom] = useState(false);
    const onZoom = useCallback(()=>{
        setShowImagesZoom(true);
    },[])
    const onClose = useCallback(()=>{
        setShowImagesZoom(false);
    },[]);
    if(images.length === 1){
        return(
            <>
                <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        )
    }
    
    if(images.length === 2){
        return(
            <>
                <img role="presentation" className='inline-block w-3/6' src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                <img role="presentation" className='inline-block w-3/6' src={images[1].src} alt={images[1].src} onClick={onZoom}/>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        )
    }
    return <>
        <div>
            <img role="presentation" className='inline-block w-3/6' src={images[0].src} alt={images[0].src} onClick={onZoom}/>
            <div className='inline-block w-3/6 text-center align-middle' onClick={onZoom}>
            <PlusOutlined/>
            <br/>
            {images.length - 1}
            개 사진 더 보기
            </div>
        </div>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
    </>
}

PostImages.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object)
}

export default PostImages