import Image from 'next/image'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '../styles/card.module.css'

interface Props {
  imageUrl: string,
  rate: number,
  title?: string,
  tags?: string,
  id: number,
  detail?: boolean,
  year?: string
}

const Card:React.FC<Props> = ({ imageUrl, rate, title, tags, id, detail, year }) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if(imageUrl && detail) {
      const temp = imageUrl.replace('/original/', '/w500/')
      setUrl(temp)
    } else if(imageUrl) {
      setUrl(imageUrl)
    }
  }, [imageUrl])

  const starRating = () => {
    const tempStar= []
    for (let i = 0; i < rate; i++) {
      tempStar.push(<>&#9733;</>)
    }
    return <>{tempStar}</>
  }

  const handleWatchNow = () => {
    Router.push(`/movie/${id}`)
  }

  return (
    <div className={styles['card']}>
      <div className={!detail ? styles['card__image-container'] : styles['card__image-container-detail']}>
        <div
          className={!detail ? styles['card-image'] : styles['card-image-detail']}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%),url(${url})`,
          }}
        >
        </div>
      </div>
      <div className={!detail ? styles['card__body-container'] : styles['card__body-container-detail']}>
        <span className={styles['card-tags']}>{tags}</span>
        <div style={{ margin: '10px 0', maxWidth: 300 }}>
          <span>
            {starRating()}
          </span>
          {
            detail ?
            <>
              <span style={{ marginLeft: '10px' }}>
                •
              </span>
              <span className={styles['card-release-year']}>
                 Release Year : {year}
              </span>
            </>
            :
            null
          }
        </div>
        <div className={styles['card-title']}>{title}</div>
      </div>
      {
        !detail ? 
          <div className={styles['card-watch-now']} style={{ color: 'yellow' }} onClick={handleWatchNow}>
            {`Watch now >`}
          </div>
        :
          null
      }
      
    </div>
  )
}
export default Card