'use client'

import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import useMeasure, { type RectReadOnly } from 'react-use-measure'
import { Container } from './container'
import { Heading } from './text'
import Image from 'next/image'
import { TeamMemberDetail } from './TeamMemberDetail'

interface TeamMember {
  name: string
  role: string
  img: string
  picture: string
  bio: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Philip D Aguirre',
    role: 'Architect',
    img: '/team/architect.jpg',
    picture: '/team/architect.jpg',
    bio: 'Born amidst the bustling creavity of New Jersey, Philip D Aguirre embarked on a journey that would see him become a luminary in the architectural world. His journey began in the sun-kissed state of Florida, where his talents started to shape the architectural landscape. An esteemed alumnus of the University of Miami, he brings over three decades of unparalleled experience to the fore. \n\n Specializing in both residential and commercial projects, his portfolio is a testament to versatility and excellence. From opulent single-family residences, sophisticated interior renovations, to imposing warehouses, professional offices, shopping plazas, and serene churches, each project is a canvas for his creative ingenuity. His crowning achievement includes designing the 25th largest home in the United States, a staggering 65,000 SF luxury residence. Predominantly shaping the landscapes of Broward & Miami Dade counties, his influence extends from the picturesque Florida Keys to West Palm Beach. His international acclaim is evident through his impactons in Ecuador and St. Martin, showcasing his global architectural prowess. \n\nPhilip\'s experience is not limited to residential spaces. He has left an indelible mark on restaurants, retail facilities, medical establishments, custom homes, clubhouses, and townhomes. His comprehensive approach ensures full-service project completion, from early-stage development, code research, and site analysis to structural design, plan presentation, and construction documentation. Notably, he has been the driving force behind the development of four residential communities, cumulatively comprising 283 homes, including Stone Brook Estates, Emerald Spring Development, Emerald Isles Development, and Stirling Palms. His urban projects like the Southwest Town Homes and Madison Lakes Town Homes further highlight his proficiency in creating community-centric living spaces. His commercial achievements are equally impressive, with projects like Rickell Say Plaza, Victoria Say Plaza, Royal University Plaza and Chip Tech Building under his belt, each showcasing a unique blend of functionality and aesthetics. \n\nPhilip D Aguirre of P A Architect Inc. is not just an architect; he is a connoisseur of spaces, a creator of dreams, and a visionary shaping the skyline of tomorrow.',
  },
  {
    name: 'Meivys Mendez Rodriguez',
    role: 'Designer',
    img: '/team/designer.jpg',
    picture: '/team/designer.jpg',
    bio: 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.',
  },
  {
    name: 'Oleed Abdulla',
    role: 'Builder',
    img: '/team/builder.jpg',
    picture: '/team/builder.jpg',
    bio: 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.',
  },
]

function TeamMemberCard({
  name,
  role,
  img,
  bounds,
  scrollX,
  children,
  ...props
}: {
  img: string
  name: string
  role: string
  children: React.ReactNode
  bounds: RectReadOnly
  scrollX: MotionValue<number>
} & HTMLMotionProps<'div'>) {
  const ref = useRef<HTMLDivElement | null>(null)

  const computeOpacity = useCallback(() => {
    const element = ref.current
    if (!element || bounds.width === 0) return 1

    const rect = element.getBoundingClientRect()

    if (rect.left < bounds.left) {
      const diff = bounds.left - rect.left
      const percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else if (rect.right > bounds.right) {
      const diff = rect.right - bounds.right
      const percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else {
      return 1
    }
  }, [ref, bounds.width, bounds.left, bounds.right])

  const opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  })

  useLayoutEffect(() => {
    opacity.set(computeOpacity())
  }, [computeOpacity, opacity])

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity())
  })

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-9/16 w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl sm:aspect-3/4 sm:w-96"
    >
      <Image
        alt=""
        src={img}
        className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
        width={400}
        height={400}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset sm:from-25%"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent p-6 text-white">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm">{role}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
      {children}
    </motion.div>
  )
}

export function MeetOurTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { scrollX } = useScroll({ container: scrollRef })
  const [setReferenceWindowRef, bounds] = useMeasure()
  const [activeIndex, setActiveIndex] = useState(0)

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member)
  }

  useMotionValueEvent(scrollX, 'change', (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current!.children[0].clientWidth))
  })

  function scrollTo(index: number) {
    const gap = 32
    const width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth
    scrollRef.current!.scrollTo({ left: (width + gap) * index })
  }

  return (
    <div className="relative mt-64">
      <Container>
        <div ref={setReferenceWindowRef}>
          <Heading as="h2" className="mt-2 text-white text-5xl ">
            Meet Our Team
          </Heading>
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          'mt-16 flex gap-8 px-[var(--scroll-padding)]',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-2xl)))/2))] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]',
          'before:fixed before:left-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-black before:to-transparent before:pointer-events-none',
          'after:fixed after:right-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-black after:to-transparent after:pointer-events-none',
          'relative',
        ])}
      >
        {teamMembers.map((member, testimonialIndex) => (
          <TeamMemberCard
            key={testimonialIndex}
            name={member.name}
            role={member.role}
            img={member.img}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => handleMemberClick(member)}
          >
            <div></div>
          </TeamMemberCard>
        ))}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
      {selectedMember && (
        <TeamMemberDetail
          name={selectedMember.name}
          picture={selectedMember.picture}
          bio={selectedMember.bio}
          role={selectedMember.role}
          onClose={() => setSelectedMember(null)}
        />
      )}
      <Container className="mt-16">
        <div className="flex justify-between">
          <div />
          <div className="hidden sm:flex sm:gap-2">
            {teamMembers.map(({ name }, testimonialIndex) => (
              <Headless.Button
                key={testimonialIndex}
                onClick={() => scrollTo(testimonialIndex)}
                data-active={
                  activeIndex === testimonialIndex ? true : undefined
                }
                aria-label={`Scroll to team member ${name}`}
                className={clsx(
                  'size-2.5 rounded-full border border-transparent bg-gray-300 transition',
                  'data-active:bg-gray-400 data-hover:bg-gray-400',
                  'forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4',
                )}
              />
            ))}
          </div>
          <div />
        </div>
      </Container>
    </div>
  )
}
