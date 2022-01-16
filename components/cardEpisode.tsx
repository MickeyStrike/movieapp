import { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect } from 'react'
import styleHome from '../styles/Home.module.css'

interface Props {
  backdrop?: string
}

const CardEpisode:NextPage<Props> = ({ backdrop }) => {

  useEffect(() => { console.log(backdrop, 'backdrop') }, [backdrop])

  return (
    <div className={styleHome['card_episode']}>
      <div className={styleHome['row']} style={{ gap: '15px' }}>
        <div className={styleHome['column']} style={{ flexGrow: 2 }}>
          <Image src={backdrop ? backdrop : 'https://image.tmdb.org/t/p/original/o76ZDm8PS9791XiuieNB93UZcRV.jpg'} width={160} height={100} />
        </div>
        <div className={styleHome['column']} style={{ flexGrow: 6 }}>
          <div className={`${styleHome['row']}`}>
            <div className={`${styleHome['column']} ${styleHome['card_episode-title']}`}>
              1 - Winter is coming
            </div>
            <div className={`${styleHome['column']} ${styleHome['card_episode-hours']}`} style={{ display: 'flex', alignContent: 'flex-end', flexGrow: 1, alignItems: 'flex-end' , justifyContent: 'flex-end'}}>
              <p>2h 30m</p>
            </div>
          </div>
          <div className={`${styleHome['row']} ${styleHome['card_episode-overview']}`}>
            A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.
          </div>
        </div>
      </div>
      <div className={styleHome['row']} style={{ marginTop: '24px' }}>
        <hr style={{ width: '100%', color: '#fff', opacity: 0.1 }}></hr>
      </div>
    </div>
  )
}

export default CardEpisode
