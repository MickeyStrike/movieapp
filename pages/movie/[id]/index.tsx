import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Card from '../../../components/card'
import CardEpisode from '../../../components/cardEpisode'
import ListMovie from '../../../components/listMovie'
import { DataSource, ResponseDetailMovie, ResponseDetailMovieSimiliar } from '../../../interfaces/interface/interface.respose'
import styleHome from '../../../styles/Home.module.css'

const DetailMovie: NextPage = () => {
  const router = useRouter()
  const [dataSource, setDataSource] = useState<DataSource[]>([])
  const [dataDetail, setDataDetail] = useState<ResponseDetailMovie | null>(null)

  const getDetailMovieSimiliar = () => {
    const { id } = router.query
    const params = {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'en-US',
      page: 1
    }
    if(id) {
      axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, { params })
      .then(({ data }:{ data: ResponseDetailMovieSimiliar }) => {
        const temp:DataSource[] = data.results.map((dataMap) => {
          return { 
            imageUrl: `https://image.tmdb.org/t/p/original${dataMap.poster_path}` || '',
            tags: 'Science Fiction',
            title: dataMap.title,
            description: dataMap.overview,
            id: dataMap.id,
          }
        }).filter((dataFilter, index) => index < 8)
        setDataSource(temp)
      })
    }
  }

  useEffect(() => getDetailMovieSimiliar(), [router])

  const getDetailMovie = () => {
    const { id } = router.query
    const params = {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'en-US',
      page: 1
    }
    if(id) {
      axios.get(`https://api.themoviedb.org/3/movie/${id}`, { params })
      .then(({ data }:{ data: ResponseDetailMovie }) => {
        setDataDetail({ ...data, poster_path: `https://image.tmdb.org/t/p/w500${data?.poster_path}`, release_date: data.release_date.split('-')[0], backdrop_path: `https://image.tmdb.org/t/p/w500${data?.backdrop_path}` })
      })
    }
  }

  useEffect(() => getDetailMovie(), [router])

  const goToDashboard = () => {
    Router.push('/')
  }

  return (
    <div className={styleHome['container']}>
      <Head>
        <title>Detail Movie</title>
        <meta name="description" content="Detail Movie" />
        <link rel="icon" href="/rebel.png" />
      </Head>

      <div className={styleHome['main']} style={{ color: 'white' }}>
        <div className={styleHome['container_detail']} style={{ color: 'white', cursor: 'pointer' }}>
          <Image src='/rebel.png' width={34} height={34} onClick={goToDashboard} />
        </div>
        <div className={`${styleHome['container_detail']} ${styleHome['mt-5']}`} style={{ color: 'white' }}>
          <Card 
            detail={true}
            id={1234}
            imageUrl={`https://image.tmdb.org/t/p/original${dataDetail?.poster_path}`}
            rate={5}
            tags='Science Fiction'
            title={dataDetail?.title}
            year={dataDetail?.release_date}
          />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flexFlow: 'row wrap' }}>
            <div className={styleHome['row']} style={{ gap: '2rem' }}>
              <div className={`${styleHome['column']}`} style={{ flexGrow: 12 }}>
                <div className={`${styleHome['row']} ${styleHome['title-synopsis']}`}>
                  Synopsis
                </div>
                <div className={`${styleHome['row']} ${styleHome['body-synopsis']}`}>
                  {dataDetail?.overview}
                </div>
              </div>
              <div className={`${styleHome['column']}`} style={{ flexGrow: 3 }}>
                <div className={`${styleHome['row']} ${styleHome['title-cast']}`}>
                  Cast
                </div>
                <div className={`${styleHome['column']} ${styleHome['body-cast']}`}>
                  <p style={{ margin: 0 }}>Gal Gadot</p>
                  <p style={{ margin: 0 }}>Kristen Wig</p>
                  <p style={{ margin: 0 }}>Chris Pine</p>
                  <p style={{ margin: 0 }}>Pedro Pascal</p> 
                  <p style={{ margin: 0, color: '#FFE922', cursor: 'pointer' }}>more</p> 
                </div>
              </div>
            </div>
            <div className={`${styleHome['row']}`} style={{ marginTop: '2rem' }}>
              <div className={`${styleHome['row']}`}>
                <div className={`${styleHome['column']} ${styleHome['title-episodes']}`}>
                  <span>Episodes</span>
                  <select className={styleHome['select-custom']} style={{ background: '#242424', color: '#fff', marginLeft: '16px' }}>
                    <option value="volvo">Season 1</option>
                  </select>
                </div>
              </div>
              <div className={styleHome['body-episode']}>
                <CardEpisode backdrop={dataDetail?.backdrop_path} />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styleHome['main']} ${styleHome['mt-5']}`}>
          <ListMovie title='You Might Also Like This!' dataProps={dataSource} />
        </div>
      </div>
    </div>
  )
}

export default DetailMovie