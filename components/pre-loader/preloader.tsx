import React, {useEffect, useRef} from 'react';
import "./preloader.css"
import gsap from "gsap";

const Preloader = () => {
    const pathRef = useRef(null);
    useEffect(() => {
        const svg = pathRef.current;
        // const svgText = document.querySelector(".hero-section .intro_text svg text");
        const tl = gsap.timeline();

        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        // Preloader Animation
        tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
            delay: 1.5,
            y: -100,
            opacity: 0,
        })
            .to(svg, {
                duration: 0.5,
                attr: { d: curve },
                ease: "power2.easeIn",
            })
            .to(svg, {
                duration: 0.5,
                attr: { d: flat },
                ease: "power2.easeOut",
            })
            .to(".preloader", {
                y: -1500,
            })
            .to(".preloader", {
                zIndex: -1,
                display: "none",
            });

       /* // Start Stroke Animation
        function startStrokeAnimation() {
            if (svgText) {
                svgText.classList.add("animate-stroke");
            }
        }*/
    }, []);
    return (
        <div
            className="preloader bg-transparent h-screen w-screen fixed left-0 top-0 flex justify-center items-center overflow-hidden z-[99999999999]">
            <div className="preloader-heading ">
                <svg
                    className={"w-screen h-screen left-0"}
                    viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <path
                        ref={pathRef}
                        id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" fill="white"></path>
                </svg>
                <div className="load-text text-4xl tracking-[15px] z-[20]">
                    {['L', 'O', 'A', 'D', 'I', 'N', 'G','.','.','.'].map((letter, index) => (
                        <span
                            key={index}
                            className="text-heading animate-[loading_1s_infinite_alternate]"
                            style={{animationDelay: `${index * 0.1}s`}}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Preloader;