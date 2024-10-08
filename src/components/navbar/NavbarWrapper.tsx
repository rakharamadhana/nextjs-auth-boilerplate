// NavbarWrapper.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "./Navbar"; // Import the client-side Navbar component

const NavbarWrapper = async () => {
    const session = await getServerSession(authOptions); // Fetch the session on the server

    return <Navbar session={session} />; // Pass the session to the client-side Navbar
};

export default NavbarWrapper;
