import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WithCustomStatusArrowsAndIndicators } from '../components/carousel'
import ListMovie from '../components/listMovie'
import { useEffect, useState } from 'react'
import { ListMoviesHome } from '../interfaces/interface/interface.respose'

const Home: NextPage = () => {

  const [listMovies, setListMovies] = useState<ListMoviesHome>({ list1: true, list2: false, list3: false })

  const handleScroll = (e:Event) => {
    if(window.scrollY >= 650 && window.scrollY <= 680 && !listMovies.list2) setListMovies({ ...listMovies, list2: true })
    else if (window.scrollY >= 1100 && !listMovies.list3) setListMovies({ ...listMovies, list3: true })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movie App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <WithCustomStatusArrowsAndIndicators />
      </main>

      <main className={styles.main}>
        { listMovies.list1 ? <ListMovie key={1} title='New Release' /> : null }
        { listMovies.list2 ? <ListMovie key={2} title='TV Show' style={{ marginTop: '2.1rem' }} page={2} /> : null }
        { listMovies.list3 ? <ListMovie key={3} title='Popular' style={{ marginTop: '2.1rem' }} page={3} /> : null }
      </main>
    </div>
  )
}

export default Home
