"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ShinyButton from "@/components/magicui/shiny-button"
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { BorderBeam } from "@/components/magicui/border-beam"
import ContactModal from '@/app/contact-modal/contact-modal'

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const images = [
    "/public/home1.jpg",
    "/public/home2.jpg",
    "/public/home3.jpg"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-1">
          <div className="flex h-24 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
              src="/ryanlogo.png"
              alt="Logo"
              height={250}
              width={250}
              className='mt-7'
              />
              <span className="sr-only">Logo</span>
            </Link>
            <nav className="flex-1 flex items-center justify-center mr-15 -ml-60">
              <ul className="flex space-x-11 text-sm font-bold">
                <li><Link className="relative inline-block hover:text-[#87b3ff] text-[#002532] font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#87b3ff] after:transition-all after:duration-300 hover:after:w-full" href="/explore-listings">Explore Listings</Link></li>
                <li><Link className="relative inline-block hover:text-[#87b3ff] text-[#002532] font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#87b3ff] after:transition-all after:duration-300 hover:after:w-full" href="/contact">Contact</Link></li>
                <li><Link className="relative inline-block hover:text-[#87b3ff] text-[#002532] font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#87b3ff] after:transition-all after:duration-300 hover:after:w-full" href="/meet-ryan">Meet Ryan</Link></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2">
                <Facebook className="h-5 w-5 text-[#002352] hover:text-[#002352]/80 transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2">
                <Instagram className="h-5 w-5 text-[#002352] hover:text-[#002352]/80 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="relative h-[600px] overflow-hidden">
          {images.map((img, index) => (
            <Image
              key={index}
              src={`/home${index + 1}.jpg`}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className={`absolute top-0 left-0 transition-opacity duration-1000 filter blur-sm ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4 transition-all duration-300 ease-in-out hover:scale-150">Find Your Dream Home</h1>
              <p className="text-xl mb-8 transition-all duration-300 ease-in-out hover:scale-105">Discover the perfect property with Ryan's expert guidance</p>
              <ShinyButton className="bg-[#002352] hover:bg-[#87b3ff]/90 text-white transition-all duration-300 ease-in-out hover:scale-125">
                Explore Listings
              </ShinyButton>
            </div>
          </div>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors">
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors">
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </section>

        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#002352]">Featured Listings</h2>
          </div>
        </section>

        <section className="py-16 bg-gray-90">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 transition-all duration-300 ease-in-out text-[#002352]">Why Choose Ryan?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: 'Expert Agent',
                  description: 'With years of experience, Ryan ensures that every transaction is smooth and hassle-free.'
                },
                {
                  title: 'Proven Track Record',
                  description: 'Ryan\'s successful sales history speaks for itself, making him the go-to agent in the market.'
                },
                {
                  title: 'Highly Reviewed',
                  description: 'Clients consistently rate Ryan as top-tier, thanks to his dedication and professionalism.'
                }
              ].map((feature, index) => (
                <Card key={index}>
                  <Card className="hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-semibold mb-2 transition-all duration-300 ease-in-out text-[#002352]">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 transition-all duration-300 ease-in-out hover:text-black">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 transition-all duration-300 ease-in-out text-[#002352]">Testimonials from Happy Clients</h2>
            <InfiniteMovingCards
              items={[
                {
                  quote: "Ryan is amazing. He knows the areas well and is very patient and explains everything in detail. He helped guide and teach me about buying my first house. Anyone looking to buy a house I highly recommend Ryan. I can't thank him enough!",
                  name: "Dalton Cochrane",
                  title: "First-Time Homebuyer"
                },
                {
                  quote: "Ryan will listen in detail of your needs! He goes above and beyond to help you find the perfect home! He listened to our wants and needs and was patient with us. The buying process was seamless and easy working with Ryan!",
                  name: "Kendra DuPont",
                  title: "Satisfied Homebuyer"
                },
                {
                  quote: "Ryan was great! He made buying my first home super easy and non-stressful. I absolutely wouldn't have been able to buy a home without him. He was very professional. I highly recommend him!",
                  name: "Madison Fetcher",
                  title: "Satisfied Homebuyer"
                },
                {
                  quote: "Ryan assisted my wife and I in finding our new home.  He was very responsive and focused on finding us the perfect fit to meet all our needs.",
                  name: "Sam Creel",
                  title: "Satisified Homebuyer"
                },
                {
                  quote: "Ryan's local knowledge was invaluable. He found us a perfect home in an ideal neighborhood.",
                  name: "David & Lisa Thompson",
                  title: "Relocating Couple"
                }
              ]}
              direction="right"
              speed="slow"
              renderItem={(testimonial) => (
                <BorderBeam borderClassName="border-white" className="w-[350px] h-[250px] flex-shrink-0 mx-2 mt-4">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <p className="text-gray-100 mb-4 transition-all duration-300 ease-in-out hover:text-black">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="flex items-center">
                        <Image src="/placeholder.svg?height=40&width=40" alt="Client" width={40} height={40} className="rounded-full mr-4" />
                        <div>
                          <p className="font-semibold transition-all duration-300 ease-in-out hover:text-[#002352]">{testimonial.name}</p>
                          <p className="text-sm text-gray-500 transition-all duration-300 ease-in-out hover:text-black">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </BorderBeam>
              )}
            />
          </div>
        </section>

        <section className="py-16 bg-[#002352] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 transition-all duration-300 ease-in-out hover:scale-105">Ready to Find Your Perfect Home?</h2>
            <p className="mb-8 transition-all duration-300 ease-in-out hover:text-gray-300">Let me help you discover the property of your dreams.</p>
            <Button onClick={openModal} className="bg-white text-[#002352] hover:bg-gray-100 transition-all duration-300 ease-in-out hover:scale-105">Contact Me Today</Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-start gap-8">
            <div className="w-full md:w-auto mb-6 md:mb-0 text-center">
              <h3 className="text-lg font-semibold mb-4 transition-all duration-300 ease-in-out hover:text-[#002352]">Ryan Kingsbury</h3>
              <p className="text-sm transition-all duration-300 ease-in-out hover:text-gray-300">Your trusted partner in finding the perfect property.</p>
            </div>
            <div className="w-full md:w-auto mb-6 md:mb-0 text-center">
              <h3 className="text-lg font-semibold mb-4 transition-all duration-300 ease-in-out hover:text-[#002352]">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/buy" className="text-sm hover:text-gray-300 transition-all duration-300 ease-in-out">Buy</Link>
                <Link href="/rent" className="text-sm hover:text-gray-300 transition-all duration-300 ease-in-out">Rent</Link>
                <Link href="/sell" className="text-sm hover:text-gray-300 transition-all duration-300 ease-in-out">Sell</Link>
                <Link href="/meet-ryan" className="text-sm hover:text-gray-300 transition-all duration-300 ease-in-out">Meet Ryan</Link>
              </nav>
            </div>
            <div className="w-full md:w-auto text-center">
              <h3 className="text-lg font-semibold mb-4 transition-all duration-300 ease-in-out hover:text-[#002352]">Contact Us</h3>
              <p className="text-sm transition-all duration-300 ease-in-out hover:text-gray-300">123 Real Estate St, Cityville, State 12345</p>
              <p className="text-sm transition-all duration-300 ease-in-out hover:text-gray-300">Phone: (123) 456-7890</p>
              <p className="text-sm transition-all duration-300 ease-in-out hover:text-gray-300">Email: info@realestate.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p className="transition-all duration-300 ease-in-out hover:text-gray-300">&copy; {new Date().getFullYear()} Our Real Estate Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}