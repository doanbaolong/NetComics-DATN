import { useRef } from 'react';
import Title from '~/components/Title';
// import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import SlideItem from './SlideItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper';
import './Slide.scss';

function Slide() {
    const prevNavigationRef = useRef();
    const nextNavigationRef = useRef();
    return (
        <div className="top-comic">
            <Title>Truyện đề cử</Title>
            <div className="items-slide">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    breakpoints={{
                        576: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        992: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                    }}
                    rewind={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevNavigationRef.current;
                        swiper.params.navigation.nextEl = nextNavigationRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    className="mySwiper"
                >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                        <SwiperSlide key={el}>
                            <SlideItem
                                imageUrl="https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/11/4/photo-6-16675562029442139900239.jpg"
                                name="Conan"
                                chapterNumber="2"
                                time="2 giờ trước"
                            />
                        </SwiperSlide>
                    ))}
                    <div ref={prevNavigationRef} className="navigation navigation-prev">
                        <GoChevronLeft />
                    </div>
                    <div ref={nextNavigationRef} className="navigation navigation-next">
                        <GoChevronRight />
                    </div>
                </Swiper>
            </div>
        </div>
    );
}

export default Slide;
