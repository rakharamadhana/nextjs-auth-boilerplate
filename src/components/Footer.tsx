// components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-center py-4 border-t mt-10 bg-zinc-50 px-4">
            <div className="container mx-auto px-4">
                <p className="text-gray-600 text-sm md:text-base">
                    &copy; {currentYear} R Creative. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
