const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-center py-6 mt-10 bg-gradient-to-t from-zinc-100 via-zinc-50 to-transparent transition-all duration-300 ease-out dark:from-indigo-600 dark:via-indigo-950 bg-opacity-80 px-4">
            <div className="container mx-auto px-4">
                <p className="text-gray-600 dark:text-primary text-sm md:text-base">
                    &copy; {currentYear} R Creative. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
