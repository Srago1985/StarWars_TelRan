
const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-4xl font-bold text-red-500">404 - Page Not Found</p>
            <p className="text-lg text-gray-500 mt-4">The page you are looking for does not exist.</p>
        </div>
    )
}

export default ErrorPage;