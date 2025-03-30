'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

let permission = 1;
const ListElement = ({ name, student, consultant, type, year, alt }: {
    name: string,
    student: string,
    consultant: string,
    type: string,
    year: string,
    alt: boolean
}) => {
    return (
        <div className={`w-full py-4 px-6 flex items-center justify-between ${alt ? 'bg-gray-100' : 'bg-white'}`}>
            <div className="grid grid-cols-5 gap-4 grow">
                <p className="truncate">{name}</p>
                <p className="truncate">{student}</p>
                <p className="truncate">{consultant}</p>
                <p className="truncate">{type}</p>
                <p className="truncate">{year}</p>
            </div>
            <Button variant="outline" className="ml-4">View</Button>
        </div>
    )
}

const mockData = [
    { name: "Project A", student: "John Doe", consultant: "Dr. Smith", type: "Research", year: "2023/2024" },
    { name: "Project B", student: "Jane Smith", consultant: "Prof. Johnson", type: "Development", year: "2023/2024" },
    { name: "Project C", student: "Mike Brown", consultant: "Dr. Williams", type: "Analysis", year: "2024/2025" },
    { name: "Project D", student: "Emily Davis", consultant: "Prof. Miller", type: "Research", year: "2024/2025" },
    { name: "Project E", student: "Chris Wilson", consultant: "Dr. Taylor", type: "Development", year: "2023/2024" },
]

export default function DatabaseBrowser() {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="container mx-auto py-8 w-full h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Database Browser</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <div className="flex gap-4">
                            <Input
                                placeholder="Search by topic, student, teacher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="grow"
                            />
                            <Button onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
                                {showAdvancedSearch ? 'Simple Search' : 'Advanced Search'}
                            </Button>
                        </div>

                        {showAdvancedSearch && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Input placeholder="Responsible Teacher" />
                                <Input placeholder="Student" />
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="submitted" />
                                    <label htmlFor="submitted" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Submitted
                                    </label>
                                </div>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type of Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="research">Research</SelectItem>
                                        <SelectItem value="development">Development</SelectItem>
                                        <SelectItem value="analysis">Analysis</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="School Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2023/2024">2023/2024</SelectItem>
                                        <SelectItem value="2024/2025">2024/2025</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                    Search
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-5 gap-4 bg-gray-800 text-white py-3 px-6">
                            <p>Topic</p>
                            <p>Student</p>
                            <p>Consultant</p>
                            <p>Type</p>
                            <p>School Year</p>
                        </div>
                        {mockData.map((item, index) => (
                            <ListElement
                                key={index}
                                name={item.name}
                                student={item.student}
                                consultant={item.consultant}
                                type={item.type}
                                year={item.year}
                                alt={index % 2 === 0}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

