import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from '../styles/carousel.module.css'
// carousel styles
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios, { AxiosResponse } from 'axios';
import { DataSource, ResponseGetNowPlaying } from '../interfaces/interface/interface.respose';
import Router from 'next/router';

// import httpService from '../simple_interceptor/http.services'

export const WithCustomStatusArrowsAndIndicators = () => {
  const [temp, setTemp] = useState<DataSource[]>([])

  const getListMovie = () => {
    const params = {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'en-US',
      page: 1
    }
    axios.get('https://api.themoviedb.org/3/movie/now_playing', { params })
    .then(({ data }:{ data: ResponseGetNowPlaying }) => {
      const tempData:DataSource[] = data.results.map((dataMap) => {
        return { id: dataMap.id, description: dataMap.overview, imageUrl: `https://image.tmdb.org/t/p/original${dataMap.backdrop_path}`, tags: 'Fantasy', title: dataMap.title }
      }).filter((dataFilter, index) => index < 3)
      setTemp(tempData)
    })
  }

  useEffect(() => getListMovie(), [])

  const handleWatchNow = (id: number) => {
    Router.push(`/movie/${id}`)
  }

  return (
      <Carousel
        swipeable={false}
        transitionTime={500}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        statusFormatter={(current, total) => ``}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button className={styles['button-carousel-left']} type="button" onClick={onClickHandler}>
              {`<`}
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button className={styles['button-carousel-right']} type="button" onClick={onClickHandler}>
              {`>`}
            </button>
          )
        }
      >
        {
          temp.map((data, index) => {
            return (
              <div key={`slide${index + 1}`}>
                <div
                  style={{
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '680px',
                    backgroundImage: `linear-gradient(269.96deg, rgba(29, 29, 29, 0) 0.04%, rgba(29, 29, 29, 0.8) 99.5%),url(${data.imageUrl})`,
                  }}
                ></div>
                <div className={styles['carousel__body-container']}>
                  <span className={styles['carousel-tags']}>{data.tags}</span>
                  <div style={{ margin: '10px 0', fontSize: 14 }}>&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                  <div className={styles['carousel-title']}>{data.title}</div>
                  <div className={styles['carousel-description']}>{data.description}</div>
                  <button className={styles['carousel-button']} type='button' onClick={() => handleWatchNow(data.id)}>Watch Now</button>
                </div>
              </div>
            )
          })
        }
      </Carousel>
  );
};