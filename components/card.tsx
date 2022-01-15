import Router from 'next/router'
import React from 'react'
import styles from '../styles/card.module.css'

interface Props {
  imageUrl: string,
  rate: number,
  title?: string,
  tags?: string,
  id: number
}

const Card:React.FC<Props> = ({ imageUrl, rate, title, tags, id }) => {

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
      <div className={styles['card__image-container']}>
        <div
          className={styles['card-image']}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%),url(${imageUrl})`,
          }}
        >
        </div>
      </div>
      <div className={styles['card__body-container']}>
        <span className={styles['card-tags']}>{tags}</span>
        <div style={{ margin: '10px 0', maxWidth: 300 }}>{starRating()}</div>
        <div className={styles['card-title']}>{title}</div>
      </div>
      <div className={styles['card-watch-now']} style={{ color: 'yellow' }} onClick={handleWatchNow}>
        {`Watch now >`}
      </div>
    </div>
  )
}
export default Card