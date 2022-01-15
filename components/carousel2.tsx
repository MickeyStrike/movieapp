import React, { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import styles from '../styles/carousel.module.css';

export const WithCustomStatusArrowsAndIndicators = () => {
  const [temp] = useState([
    {
      imageUrl: `https://image.tmdb.org/t/p/original/tutaKitJJIaqZPyMz7rxrhb4Yxm.jpg`,
      tags: 'Science Fiction',
      title: 'Godzilla vs. Kong',
      description: 'Buster and his new cast now have their sights set on debuting a new show at the Crystal Tower Theater in glamorous Redshore City. But with no connections, he and his singers must sneak into the Crystal Entertainment offices, run by the ruthless wolf mogul Jimmy Crystal, where the gang pitches the ridiculous idea of casting the lion rock legend Clay Calloway in their show. Buster must embark on a quest to find the now-isolated Clay and persuade him to return to the stage.'
    },
    {
      imageUrl: `https://image.tmdb.org/t/p/original/EnDlndEvw6Ptpp8HIwmRcSSNKQ.jpg`,
      tags: 'Fantasy',
      title: "Zack Synder's Justice League",
      description: 'When a single mom and her two kids arrive in a small town, they begin to discover their connection to the original Ghostbusters and the secret legacy their grandfather left behind.'
    },
  ])
  return (
    <Swiper
      modules={[EffectFade, Navigation, Pagination]}
      effect="fade"
      navigation
      className={`${styles['swiper-pagination-bullet-active']}`}
      pagination={{
        clickable: true,
        // el: '.swiper-pagination',
        type: 'bullets',
        // bulletActiveClass: styles['swiper-pagination-bullet-active'],
        // bulletActiveClass: 'swiper-pagination-bullet-active',
        // bulletClass: 	'swiper-pagination-bullet',
      }}
      // scrollbar={{ draggable: false }}
    >
      {temp.map((data, el) => {
        return <SwiperSlide key={el}>
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
            <button className={styles['carousel-button']} type='button'>Watch Now</button>
          </div>
        </SwiperSlide>;
      })}
    </Swiper>
  );
};