export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-fit flex-col md:flex-row md:overflow-hidden">
            <div className="flex-grow pl-6 pt-6 md:pl-12 md:pt-12 md:overflow-y-auto ">{children}</div>
        </div>
    );
}