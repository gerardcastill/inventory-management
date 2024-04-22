import Image from '../../images/gerardo.jpeg';
import {
    AcademicCapIcon,
    RocketLaunchIcon,
    SparklesIcon,
    SunIcon,
} from '@heroicons/react/20/solid'

const values = [
    {
        name: 'Goal',
        description: 'My goal is to apply my teaching and problem-solving skills to the software development field, where I can collaborate with other developers on various projects and learn from their feedback and insights.',
        icon: RocketLaunchIcon,
    },
    {
        name: 'Always learning',
        description: 'I like to challenge myself by learning new technology stacks and subjects that interest me such as biology, chemistry, finance and physics.',
        icon: AcademicCapIcon,
    },
    {
        name: 'Refining my skills',
        description: 'I am putting more effort in becoming proficient with Javascript for frontend, Java for backend, and C++ for embedded systems.',
        icon: SparklesIcon,
    },
    {
        name: 'I enjoy my downtime',
        description: 'For fun I like to go hiking and play video games. My favorite video game currently is Helldivers 2.',
        icon: SunIcon,
    },
]

export default function About() {
    return (
        <div className="bg-gray-900">

            <main className="relative isolate">
                {/* Background */}
                <div
                    className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff]
                        to-[#4f46e5] opacity-25"
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, ' +
                                '55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, ' +
                                '5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                    />
                </div>

                {/* Flex Container */}
                <div className={"mx-auto max-w-7xl px-2 lg:px-4 py-10 lg:flex"}>
                    {/* Self section */}
                    <div className="flex-1 lg:px-10">
                        <img className="aspect-[14/13] w-full rounded-2xl object-cover" src={Image} alt="" />
                        <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                            Gerardo Castillo
                        </h3>
                        <p className="text-base leading-7 text-gray-300">Software Engineer</p>
                        <p className="text-sm leading-6 text-gray-500">Houston, Texas</p>
                    </div>

                    {/* Values section */}
                    <div className="flex-1">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">About Me</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Hi! My name is Gerardo Castillo. With a master’s degree in Software Engineering and 7 years
                                of experience as an educator, I am a Full Stack Developer who combines
                                technical expertise with communication and problem-solving skills.
                            </p>
                        </div>
                        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300
                        sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
                            {values.map((value) => (
                                <div key={value.name} className="relative pl-9">
                                    <dt className="inline font-semibold text-white">
                                        <value.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                                                    aria-hidden="true" />
                                        {value.name}
                                    </dt>{' '}
                                    <dd className="inline">{value.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </main>
        </div>
    )
}