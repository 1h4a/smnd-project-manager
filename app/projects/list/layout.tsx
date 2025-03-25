export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:overflow-hidden">
            <div className="grow md:overflow-y-auto pl-6 pr-6 pt-2 md:pl-12 md:pr-12 justify-center">{children}</div>
        </div>
    );
}