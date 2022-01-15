import React, { useState, useEffect, CSSProperties } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper';
import styles from '../styles/Home.module.css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation';
import 'swiper/css';
import Card from './card';
import axios from 'axios';
import { DataSource, ResponseGetNowPlaying } from '../interfaces/interface/interface.respose';
import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
  dataProps?: DataSource[];
  title: string;
  style?: CSSProperties;
  page?:number;

}

const ListMovie:NextPage<Props> = ({ dataProps, title, style, page = 1 }) => {

  const [listData, setListData] = useState<DataSource[]>([])
  const [titleList, setTitleList] = useState('')
  const [loading, setLoading] = useState(false)

  const getListMovie = () => {
    const params = {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'en-US',
      page
    }
    if(!dataProps) {
      setLoading(true)
      axios.get('https://api.themoviedb.org/3/movie/now_playing', { params })
      .then(({ data }:{ data: ResponseGetNowPlaying }) => {
        const tempData:DataSource[] = data.results.map((dataMap) => {
          return { id: dataMap.id, description: dataMap.overview, imageUrl: `https://image.tmdb.org/t/p/original${dataMap.poster_path}`, tags: 'Fantasy', title: dataMap.title }
        }).filter((dataFilter, index) => index < 8)
        setListData(tempData)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
    }
  }

  useEffect(() => getListMovie(), [])

  useEffect(() => {
    if(dataProps && dataProps.length > 0) {
      setListData(dataProps)
    }
  }, [dataProps])

  useEffect(() => {
    if(title) setTitleList(title)
  }, [title])

  if(loading) return (
  <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
    <Image src={'/loading2.gif'} width={100} height={100} />
  </div> )

  return (
    <div style={style ? style : undefined}>
      <div className={styles['container_flex']}>
        <div className={styles['title-list']}>
          {titleList}
        </div>
        <div className={styles['see-all-list']}>
          {`See All >`}
        </div>
      </div>
      <Swiper
        style={{ paddingLeft: '10%' }}
        freeMode={{
          enabled: true,
          sticky: false,
          minimumVelocity: 0.02,
        }}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          // when window width is >= 640px
          660: {
            slidesPerView: 2,
            spaceBetween: 5
          },
          // // when window width is >= 980px
          980: {
            slidesPerView: 3,
            spaceBetween: 5
          },
          // // when window width is >= 1280px
          1280: {
            slidesPerView: 4,
            spaceBetween: 20
          },
        }}
        slidesPerView={4}
        modules={[FreeMode]}
      >
        {
          listData.map((dataMap, index) => {
            return (
              <SwiperSlide>
                <Card
                  id={dataMap.id}
                  key={index}
                  rate={5}
                  imageUrl={dataMap.imageUrl}
                  tags={dataMap.tags}
                  title={dataMap.title}
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default ListMovie