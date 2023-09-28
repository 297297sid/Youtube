import React from 'react'
import moment from 'moment'
import './_comment.scss'
const Comment = ({ comment }) => {
    
    const { authorDispalyName, authorProfileImageUrl, publishedAt, textDisplay } = comment;
    return (
        <div className='comment p-2 d-flex'>
             <img
          src={authorProfileImageUrl}
          alt="Avatar Anonimo Mujer - Women User Icon Png@pngkey.com"
          style={{ borderRadius: '50%', height: '50px', width: '50px', objectFit: 'contain' }}></img>
            <div className='comment__body'>
                <p className='comment__header mb-1'>
                    {authorDispalyName}   •  {moment(publishedAt).fromNow()}             </p>
                <p className='mb-0'>{ textDisplay}</p>
            </div>

        </div>
    )
}
export default Comment