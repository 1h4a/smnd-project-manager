export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-fit flex-col md:flex-row md:overflow-hidden">
            <div className="flex-grow px-6 pt-2 md:px-12 md:overflow-y-auto ">{children}</div>
        </div>
    );
}