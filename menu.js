import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'



const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75, 
    innerWidth / innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:{
            globeTexture:{
                value:new THREE.TextureLoader().load('globe.png')
            }
        }
}))

scene.add(sphere)
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader, 
        blending: THREE.AdditiveBlending, 
        // side: THREE.Backside
}))

atmosphere.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

camera.position.z = 15

// const mouse = {
//   x: undefined,
//   y: undefined
// }

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    sphere.rotation.y += 0.001
    // group.rotation.y = mouse.x * 0.5
    // sphere.rotation.y += 0.007
}
animate()


// addEventListener('mousemove', () => {
//   mouse.x = (event.clientX / innerWidth) * 2 - 1
//   mouse.y = -(event.clientY / innerHeight) * 2 + 1
// })

const starGeo = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color:0xffffff
})
const starVert = []
for(let i=0; i < 10000; i++){
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = (Math.random() - 0.5) * 2000
  starVert.push(x, y, z)
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVert, 3))
console.log(starGeo)
console.log(starMaterial)
const stars = new THREE.Points(starGeo, starMaterial)
scene.add(stars)


addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  })

  gsap.to('#jodem', {
    opacity:1,
    duration:3
  })  
  gsap.to('#welcome', {
    opacity:1,
    duration:3,
    delay: 1
  })
  gsap.to('#view', {
    opacity:1,
    duration:3,
    delay: 1
  })
  gsap.to('#top', {
    opacity:1,
    duration:3,
    delay: 1
  })
  gsap.to('#random', {
    opacity:1,
    duration:3,
    delay: 1
  })
    
  document.querySelector('#view').addEventListener('click', (e)=>{
    e.preventDefault()
    gsap.to('#as', {
      opacity:1,
      duration:1
    })
    gsap.to('#ns', {
      opacity:1,
      duration:1,
      delay:1
    })
    gsap.to('#ac', {
      opacity:1,
      duration:1,
      delay:2
    })
    gsap.to('#lm', {
      opacity:1,
      duration:1,
      delay:3
    })
    // gsap.to(camera.position, {
    //   z:5.8,
    //   ease: 'power3.in',
    //   duration: 1.5,
    //   delay: 1.5,
    //   onComplete: () =>{
    //     window.location = 'about.html'
    //   }
    // })
  })
  
  document.querySelector('#top').addEventListener('click', (e)=>{
    e.preventDefault()
    gsap.to('#as', {
      opacity:0,
      duration:1
    })
    gsap.to('#ns', {
      opacity:1,
      duration:1,
    })
    gsap.to('#ac', {
      opacity:0,
      duration:1,
    })
    gsap.to('#lm', {
      opacity:0,
      duration:1,
    })
  })



  document.querySelector('#random').addEventListener('click', (e)=>{
    e.preventDefault()
    gsap.to('#as', {
      opacity:0,
      duration:1
    })
    gsap.to('#ns', {
      opacity:0,
      duration:1,
    })
    gsap.to('#ac', {
      opacity:0,
      duration:1,
    })
    gsap.to('#lm', {
      opacity:0,
      duration:1,
    })

  const apps = ["lm", "ac", "ns", "as"];
  function getRandomApp(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
  }
    let index = getRandomApp(0, apps.length -1)
    gsap.to(`#${apps[index]}`, {
      opacity:1,
      duration:1,
    })  
  })

  function dissappear() {
    gsap.to('#as', {
      opacity:0,
      duration:1
    })
    gsap.to('#ns', {
      opacity:0,
      duration:1,
    })
    gsap.to('#ac', {
      opacity:0,
      duration:1,
    })
    gsap.to('#lm', {
      opacity:0,
      duration:1,
    })
    gsap.to('#jodem', {
      opacity:0,
      duration:1
    })  
    gsap.to('#welcome', {
      opacity:0,
      duration:1,
    })
    gsap.to('#view', {
      opacity:0,
      duration:1,
    })
    gsap.to('#top', {
      opacity:0,
      duration:1,
    })
    gsap.to('#random', {
      opacity:0,
      duration:1,
    })
  }

  document.querySelector('#asdet').addEventListener('click', (e)=>{
    e.preventDefault()
    dissappear()
    gsap.to(camera.position, {
      z:5.8,
      ease: 'power3.in',
      duration: 1.5,
      delay: 1.5,
      onComplete: () =>{
        window.location = 'details1.html'
      }
    })
  })

  document.querySelector('#nsdet').addEventListener('click', (e)=>{
    e.preventDefault()
    dissappear()
    gsap.to(camera.position, {
      z:5.8,
      ease: 'power3.in',
      duration: 1.5,
      delay: 1.5,
      onComplete: () =>{
        window.location = 'details2.html'
      }
    })
  })

  document.querySelector('#acdet').addEventListener('click', (e)=>{
    e.preventDefault()
    dissappear()
    gsap.to(camera.position, {
      z:5.8,
      ease: 'power3.in',
      duration: 1.5,
      delay: 1.5,
      onComplete: () =>{
        window.location = 'details3.html'
      }
    })
  })

  document.querySelector('#lmdet').addEventListener('click', (e)=>{
    e.preventDefault()
    dissappear()
    gsap.to(camera.position, {
      z:5.8,
      ease: 'power3.in',
      duration: 1.5,
      delay: 1.5,
      onComplete: () =>{
        window.location = 'details4.html'
      }
    })
  })
 

  // document.querySelector('#ibree').addEventListener('click', (e)=>{
  //   e.preventDefault()
  //   gsap.to('#text', {
  //     opacity:0,
  //     duration:3
  //   })
  //   gsap.to(camera.position, {
  //     z:5.8,
  //     ease: 'power3.in',
  //     duration: 1.5,
  //     delay: 1.5,
  //     onComplete: () =>{
  //       window.location = 'https://google.com'
  //     }
  //   })
  // })
  

  // const accordionHeader = document.querySelectorAll(".accordion-header");

  // accordionHeader.forEach(accordionHeader => {
  //   accordionHeader.addEventListener("click", event => {
  //     accordionHeader.classList.toggle("active");
  //   })
  // })