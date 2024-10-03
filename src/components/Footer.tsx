// components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-center py-4 border-t mt-auto bg-zinc-50">
            <div className="container mx-auto px-4">
                <p className="text-gray-600 text-sm md:text-base">
                    &copy; {currentYear} Rakha Ramadhana. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
