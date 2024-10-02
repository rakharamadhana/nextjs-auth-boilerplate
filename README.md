# Next.js Project with NextAuth, Prisma, and Supabase PostgreSQL

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Overview

This project is a full-stack web application built using:

- **[Next.js](https://nextjs.org/)**: A React framework for building modern web applications with server-side rendering and static site generation.
- **[NextAuth](https://next-auth.js.org/)**: Authentication solution for Next.js with built-in support for popular OAuth providers and credentials authentication.
- **[Prisma ORM](https://www.prisma.io/)**: An ORM that helps you manage your PostgreSQL database with ease.
- **[Supabase](https://supabase.com/)**: A powerful open-source Firebase alternative, providing a PostgreSQL database for the project.

## Getting Started

### Prerequisites

Ensure you have the following tools installed:

- Node.js
- PostgreSQL (if you're running the database locally, otherwise ensure your Supabase project is set up)
- Prisma CLI (`npm install prisma`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/your-project.git
   cd your-project
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```
3. Set up your environment variables

    Create a ```.env``` file in the root of your project and provide the necessary environment variables

    ```bash
    DATABASE_URL=your-supabase-postgres-url
    NEXTAUTH_SECRET=your-nextauth-secret
    ```
4. Run database migrations with Prisma:

    ```bash
   npx prisma migrate dev
    ```

5. Run the development server

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

   Open http://localhost:3000 in your browser to see the result.

### Authentication with NextAuth

NextAuth is configured to handle authentication via credentials and OAuth providers. In this project, it is set up with Prisma ORM to connect to your Supabase PostgreSQL database.

You can find the authentication setup in ```src/app/api/auth/[...nextauth]/route.ts```.

### Database Setup with Prisma and Supabase PostgreSQL

This project uses Prisma as the ORM to connect to a Supabase-hosted PostgreSQL database. Ensure your Prisma schema file (```prisma/schema.prisma```) is configured with the correct connection string from Supabase.

To apply database changes and generate Prisma client:
 
```bash
npx prisma migrate dev
npx prisma generate
```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn more about Next.js features and API.
- **[NextAuth Documentation](https://next-auth.js.org/getting-started/introduction)** - Authentication for Next.js.
- **[Prisma Documentation](https://www.prisma.io/docs)** - Database access and management with Prisma.
- **[Supabase Documentation](https://supabase.com/docs)** - Hosted PostgreSQL backend.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new/rcreative?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License.