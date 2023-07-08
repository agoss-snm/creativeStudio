import React, { useEffect, useState } from 'react';
import './HomePage.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';
import $ from 'jquery';

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

      // Add fade-in effect to images
      gsap.utils.toArray('img').forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: img,
              start: 'top 80%', // Adjust the position at which the fade-in is triggered
              end: 'bottom 20%', // Adjust the position at which the fade-in is completed
              scrub: true,
            },
          }
        );
      });

      setIsLoading(false); // Indicate that the loading has finished
    };

    imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);
  }, []);

  const viewport = $(window);
  const root = $('html');
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
        <div className='containter'>
          <h1 className='title'>AI-powered strategy creation</h1>
          <div className="parallax box">
            <p>By combining the power of <code>`rem`</code> and a small JavaScript function to manipulate the <code>`font-size`</code> of the <code>`html`</code> element, we can achieve simple but effective parallaxing.</p>
            <p>Setting all our positions and parallax movements in CSS, this technique minimizes DOM manipulations to just one &ndash; on the <code>`html`</code> element &ndash; boosting overall performance, although certainly not better than using 3D transforms.</p>
            <p>The speed and direction of each element is set using margins (for this demo, I've used <code>`margin-top`</code>). Play around with the numbers yourself to get a better understanding.</p>
            <p>This is just a proof of concept and hasn't been fully tested, though it should work everywhere that supports <code>`rem`</code> (<a href="http://caniuse.com/#feat=rem">see here</a>). Using <code>`rem`</code> in this way does have its pitfalls &ndash; most notably the loss of its traditional usage &ndash; but it's a nice trick.</p>
          </div>

        </div>
        <section className="demo-gallery gallery1">
          <ul className="wrapper">
            <li>
            </li>
            <li>
              <img
                src="https://source.unsplash.com/random/1240x874?sig=118"
                alt="Gallery Image 3"
              />
            </li>
          </ul>
        </section>

        <section className="demo-gallery gallery2">
        <h1 >The &lsquo;root element&rsquo; parallax technique</h1>
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
        <h1 >The &lsquo;root element&rsquo; parallax technique</h1>
        <div>

          <p>Lorem</p>
        </div>

        <footer className="df aic jcc">
          <p>
            Images from <a href="https://unsplash.com/">Unsplash</a>
          </p>
        </footer>
      </div>


    </div>
  );
}

export default HomePage;
