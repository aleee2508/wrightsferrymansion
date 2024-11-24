console.log("adding polish...");
        
// document.addEventListener("DOMContentLoaded", function() {

        gsap.registerPlugin(ScrollTrigger);
        let mm = gsap.matchMedia(),
          breakPoint = 992;
          console.log(document.querySelector('.app').scrollWidt);

          console.log("Ancho total de .main:", document.querySelector('.main').scrollWidth);
          console.log("Ancho de la ventana:", window.innerWidth); 
        mm.add(
          {
            // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
            isDesktop: `(min-width: ${breakPoint}px)`,
            isMobile: `(max-width: ${breakPoint - 1}px)`,
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
            let { isDesktop, isMobile, reduceMotion } = context.conditions;
            
            // HORIZONTAL SCROLL
            
            const tlMain = gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".app",
                  start: "top top",
                  end: () => `+=${document.querySelector('.main').scrollWidth + 810}`, // Calcula el final basado en el ancho del contenido
                  scrub: 1,
                  pin: true,
                  invalidateOnRefresh: true,
                  markers: false,
                },
              })
              .to(".main", {
                x: () => `${-($(".main").width() - window.innerWidth + 810)}`,
                ease: "none",
              });
              
            if (isDesktop) {
                
              // SCALE EFFECTS
              $("[data-scale-image-wrapper]").each(function () {
                gsap.from($(this).find("[data-scale-image]"), {
                  scrollTrigger: {
                    trigger: $(this),
                    start: "left right",
                    end: "right left",
                    scrub: true,
                    containerAnimation: tlMain,
                  },
                  scale: 1.7,
                  ease: "none",
                });
              });
        
              // PARALAX ELEMENTS
        
              $("[data-parallax-element-wrapper]").each(function () {
                if (
                  $(this).attr("data-parallax-lag") === "false" ||
                  $(this).attr("data-parallax-lag") === undefined
                ) {
                  gsap
                    .timeline({
                      scrollTrigger: {
                        trigger: $(this),
                        start: "left right",
                        end: "right left",
                        scrub: true,
                        containerAnimation: tlMain,
                      },
                    })
                    .fromTo(
                      $(this).find('[data-parallax-element="true"]'),
                      {
                        x: `${
                          50 * $(this).attr("data-parallax-element-speed-modifier")
                        }%`,
                        ease: "none",
                      },
                      {
                        x: `-${
                          50 * $(this).attr("data-parallax-element-speed-modifier")
                        }%`,
                        ease: "none",
                      }
                    );
                } else {
                  gsap
                    .timeline({
                      scrollTrigger: {
                        trigger: $(this),
                        start: "left right",
                        end: "right left",
                        scrub: true,
                        containerAnimation: tlMain,
                      },
                    })
                    .to($(this).find('[data-parallax-element="true"]'), {
                      x: `${
                        100 * $(this).attr("data-parallax-element-speed-modifier")
                      }%`,
                      ease: "none",
                    });
                }
              });
        
              // HEADING COMPONENT FADE IN
        
              $("[data-fade-in-wrapper]").each(function () {
                gsap.from($(this).find("[data-fade-in-element='true']"), {
                  scrollTrigger: {
                    trigger: $(this),
                    start: isDesktop ? "center right" : "top bottom",
                    containerAnimation: tlMain,
                  },
                  opacity: 0,
                  // scale: 0.93,
                  duration: 1,
                  ease: "power1.inOut",
                  stagger: 0.21,
                });
              });
        
              // HOME LIST ITEMS FADE IN
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: "[data-list-fade-in-wrapper]",
                    start: "left right",
                    end: "right left",
                    containerAnimation: tlMain,
                    // markers: true,
                    // scrub: true,
                  },
                })
                .from("[data-list-fade-in-element]", {
                  opacity: 0,
                  stagger: 0.11,
                  duration: 1,
                  ease: "power1.inOut",
                });
        
              // END IF ELSE
            }
        
            // HERO FADE IN
        
            $("[data-hero-fade-in-wrapper]").each(function () {
              gsap.from($(this).find("[data-hero-fade-in-element]"), {
                opacity: 0,
                // scale: 0.93,
                duration: 1,
                ease: "power1.inOut",
                stagger: 0.08,
              });
            });
        
            return () => {
              // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
              // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
            };
          }
        );
// });