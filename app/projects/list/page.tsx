import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import clsx from 'clsx'
import Link from 'next/link'
import { prisma } from "@/prisma"

interface ListProps {
    name: string,
    assigned: string,
    consultant: string,
    type: string,
    year: string,
    alt: boolean
}

const ListElement = ({ name, assigned, consultant, type, year, alt } : ListProps) => {
    return(
        <div
            className={clsx("w-full h-1/12 items-center text-center justify-between flex flex-row text-white ",
                {
                    'bg-darkgray/50' : alt,
                },
                {
                    'bg-textgray/70' : !alt,
                }
                )}>
            <div className="px-8 py-1 flex flex-row items-center justify-between w-full">
                <p className="w-1/5"> {name} </p>
                <p className="w-1/5"> {assigned} </p>
                <p className="w-1/5"> {consultant} </p>
                <p className="w-1/5"> {type} </p>
                <p className="w-1/5"> {year} </p>
            </div>
            <Link
            href="/projects/view">
                <Button
                    className="items-center text-base h-max rounded-none py-5 m-0 justify-center text-center px-12 bg-gray-100 text-textgray shadow-inner hover:shadow-none hover:bg-gray-200 active:bg-regulargray transition-colors">
                    Zobraziť
                </Button>
            </Link>
        </div>
    );
}

async function fetchAllProjects() {
    return await prisma.project.findMany({
        select: {
            topic: true,
            assigned: {
              select: {
                  role: true,
                  name: true
              }
            },
            type: true,
            year: true
        }
    })
}

interface ml_props { // [!] Not safe to use by standard
    data: any
}
const MakeList = ({ data } : ml_props) => {
    let projects: any[] = []
    data.map((project: any, i: number) => {
        let students: any[] = []
        let consultants: any[] = []

        project.assigned.map((el: any) => {
            if(el.role == "STUDENT") {
                students.push(el.name)
            }
            else {
                consultants.push(el.name)
            }
        })

        const studentsString = students.join(', ')
        const consultantsString = consultants.join(', ')

        const year = project.year

        const topic = project.topic
        const type = project.type
        projects.push(
            {
                students: studentsString,
                consultants: consultantsString,
                year: year,
                topic: topic,
                type: type.name
            }
        )
    })

    return (
      <div>
          {projects.map((el, i) => (
              <ListElement
              name={el.topic}
              consultant={el.consultants}
              assigned={el.students}
              type={el.type}
              year={el.year}
              alt={i % 2 === 0}
              key={"p_el" + i}
              />
          ))}
      </div>
    );
}
export default async function Page() {
    const data = await fetchAllProjects()
    return (
        <div className="w-full h-fit items-center justify-center overflow-y-hidden pb-4">
            <Link
                href="/projects"
                className="items-center justify-start flex-row flex text-darkgray">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-5 rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
                <p>Späť na aktuálne práce</p>
            </Link>
                <Input
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-ngray py-1.5 px-3 text-md text-black overflow-visible',
                        'focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/5'
                    )}
                    placeholder="Vyhľadávanie podľa témy, študenta, učiteľa..."
                />
            <div className="rounded-2xl w-full block h-[70vh] bg-ngray my-4 text-md text-black overflow-y-scroll">
                <div
                    className="flex flex-row sticky top-0">
                    <div
                        className="w-full h-1/12 bg-darkgray text-center items-center justify-between flex flex-row text-white px-8 py-2 rounded-tl-2xl">
                        <p className="w-1/5"> Téma </p>
                        <p className="w-1/5"> Priradení študenti </p>
                        <p className="w-1/5"> Zodpovedný učiteľ </p>
                        <p className="w-1/5"> Typ projektu </p>
                        <p className="w-1/5"> Školský rok </p>
                    </div>
                    <div
                        className="items-center justify-center text-center px-12 py-2 bg-darkgray text-black/0 select-none">
                        Zobraziť
                    </div>
                    <div
                        className="absolute px-16 py-5 bg-gray-100 -z-10 right-10">
                    </div>
                </div>
                <MakeList data={data}/>
            </div>
        </div>
    );
}