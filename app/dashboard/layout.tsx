export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="flex-grow md:overflow-y-auto pl-6 pt-6 md:pl-12 md:pt-12">{children}</div>
        </div>
    );
}