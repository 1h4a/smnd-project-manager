'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'

// Button Component
const Button = ({ children, onClick, className = '', variant = 'default' }: { children: ReactNode, onClick?: () => void, className?: string, variant?: 'default' | 'outline' }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
    const variantStyles = {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
    }
    return (
        <button className={`${baseStyle} ${variantStyles[variant]} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

// Input Component
const Input = ({ placeholder, value, onChange, className = '' }: { placeholder: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, className?: string }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    )
}

// Checkbox Component
const Checkbox = ({ id, label }: { id: string, label: string }) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={id}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={id} className="ml-2 text-sm text-gray-700">
                {label}
            </label>
        </div>
    )
}

// Select Component
const Select = ({ placeholder, options }: { placeholder: string, options: { value: string, label: string }[] }) => {
    return (
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

// Card Component
const Card = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {children}
        </div>
    )
}

const CardHeader = ({ children }: { children: ReactNode }) => {
    return (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            {children}
        </div>
    )
}

const CardTitle = ({ children }: { children: ReactNode }) => {
    return (
        <h2 className="text-xl font-semibold text-gray-800">
            {children}
        </h2>
    )
}

const CardContent = ({ children }: { children: ReactNode }) => {
    return (
        <div className="px-6 py-4">
            {children}
        </div>
    )
}

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
            <div className="grid grid-cols-5 gap-4 flex-grow">
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
        <div className="container mx-auto py-8">
            <Link href="/projects" className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
                <span className="mr-2">←</span>
                <span>Back to Current Projects</span>
            </Link>

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
                                className="flex-grow"
                            />
                            <Button onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
                                {showAdvancedSearch ? 'Simple Search' : 'Advanced Search'}
                            </Button>
                        </div>

                        {showAdvancedSearch && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Input placeholder="Responsible Teacher" />
                                <Input placeholder="Student" />
                                <Checkbox id="submitted" label="Submitted" />
                                <Select
                                    placeholder="Type of Project"
                                    options={[
                                        { value: "research", label: "Research" },
                                        { value: "development", label: "Development" },
                                        { value: "analysis", label: "Analysis" },
                                    ]}
                                />
                                <Select
                                    placeholder="School Year"
                                    options={[
                                        { value: "2023/2024", label: "2023/2024" },
                                        { value: "2024/2025", label: "2024/2025" },
                                    ]}
                                />
                                <Button className="w-full">
                                    <span className="mr-2">🔍</span>
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

