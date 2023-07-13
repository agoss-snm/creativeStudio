import React, { useEffect, useState } from 'react';
import './HomePage.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';
import $ from 'jquery';
import TimeLine from '../../components/TimeLine/TimeLine';
//bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//img
import max from '../../img/max.jpg'
import h from '../../img/h.jpg'
import g from '../../img/g.jpg'


function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const images = gsap.utils.toArray('img');
    const loader = document.querySelector('.loader--text');
    const updateProgress = (instance) => {
      let progress = 0;
      const interval = setInterval(() => {
        loader.textContent = `${progress}%`;
        progress++;
        if (progress > (instance.progressedCount * 100) / images.length) {
          clearInterval(interval);
        }
      }, 10);
    };

    const showDemo = () => {
      document.body.style.overflow = 'auto';
      document.scrollingElement.scrollTo(0, 0);
      gsap.to(document.querySelector('.loader'), { autoAlpha: 0, delay: 1 });

      gsap.utils.toArray('section').forEach((section, index) => {
        const w = section.querySelector('.wrapper');
        const [x, xEnd] = index % 2 ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * 1, 0];
        gsap.fromTo(
          w,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              trigger: section,
              scrub: 2.5,
            },
          }
        );
      });

      gsap.from('.title', {
        opacity: 0,
        y: 100,
        duration: 3,
        delay: 0.8,
      });

      setIsLoading(false);
    };

    imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);
  }, []);

  const viewport = $(window);
  const root = $('.html');
  let maxScroll;

  viewport.on({
    scroll: function () {
      const scrolled = viewport.scrollTop();
      root.css({ fontSize: (scrolled / maxScroll) * 50 });
    },
    resize: function () {
      maxScroll = root.height() - viewport.height();
    },
  }).trigger('resize');
  
  return (
    <div className="containerr">
      <div className="loader df aic jcc">
        <div className="loadingClass">
          <h1>Loading</h1>
          <h2 className="loader--text">0%</h2>
        </div>
      </div>

      <div className="demo-wrapper">
        <div className='containter' id='banner'>
          <div className='widthT'>
            <h1 className='title'>AI-powered strategy creation</h1>
            <button className='btnCreateAI'> <a href="/createwithia" id='start'>Free Trial</a></button>
          </div>
        </div>
        
        <section className="demo-gallery gallery2">
          <h1 className='titlePad1'>Your own personal designer, AI developer.</h1>
          <ul className="wrapper">
            <li>
              <img
                src="https://source.unsplash.com/random/1240x874?sig=83"
                alt="Gallery Image 4"
              />
            </li>
            <li>
              <img
                src="https://source.unsplash.com/random/1240x874?sig=20"
                alt="Gallery Image 5"
              />
            </li>
            <li>
              <img
                src="https://source.unsplash.com/random/1240x874?sig=103"
                alt="Gallery Image 6"
              />
            </li>
          </ul>
        </section>

        <TimeLine/>
        
        <div className='container' id='container3'>
          <h1 className='titlePad'>No-code AI Website Builder</h1>
          <Row xs={1} md={2} className="g-4">
            <Col>
              <Card className='d-flex align-items-center withnoLine'>
                <div className="image-container">
                  <Card.Img className='imgCard' variant="top" src={max} />
                </div>
                <div className="card-content">
                  <Card.Body>
                    <Card.Title className='max'>&#10077;</Card.Title>
                    <Card.Text> <span className='yellowCard'>WordPress killer.</span> I finally enjoy updating my website and growing my business.</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Col>
            <Col>
              <Card className='d-flex align-items-center withnoLine'>
                <div className="image-container">
                  <Card.Img className='imgCard' variant="top" src={h} />
                </div>
                <div className="card-content">
                  <Card.Body>
                    <Card.Title className='max'>&#10077;</Card.Title>
                    <Card.Text>We built our website in no time. <strong>Without coding</strong> and powered by <strong>AI technology</strong>, it's a game changer.</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Col>
            <Col>
              <Card className='d-flex align-items-center withnoLine'>
                <div className="image-container">
                  <Card.Img className='imgCard' variant="top" src={g} />
                </div>
                <div className="card-content">
                  <Card.Body>
                    <Card.Title className='max'>&#10077;</Card.Title>
                    <Card.Text>I was able to generate a customized website in just a few clicks. <strong>Recommended!</strong></Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Col>
            <Col>
              <Card className='d-flex align-items-center withnoLine'>
                <div className="image-container">
                  <Card.Img className='imgCard' variant="top" src={max} />
                </div>
                <div className="card-content">
                  <Card.Body>
                    <Card.Title className='max'>&#10077;</Card.Title>
                    <Card.Text> <span className='yellowCard'>Time is money</span>. That's why this website builder is the perfect tool for me.</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

    
    </div>
  );
}

export default HomePage;
