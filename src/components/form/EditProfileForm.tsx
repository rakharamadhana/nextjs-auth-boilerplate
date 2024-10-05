'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from "@/hooks/use-toast";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from 'react';
import {useRouter} from "next/navigation";

// Define the validation schema
const FormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
});

const EditProfileForm = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',  // Start with empty values
            email: '',
        },
    });

    // Update default values when session is available
    useEffect(() => {
        if (session?.user) {
            form.reset({
                name: session.user.name || '',
                email: session.user.email || '',
            });
        }
    }, [session, form]);

    // Inside your onSubmit function
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log(session);
        const response = await fetch(`/api/user/${session?.user.id}`, { // Assume session.user.id holds the user's ID
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                name: values.name,
            }),
        });

        if (response.ok) {
            toast({
                title: "Success",
                description: "Profile updated successfully!",
                variant: 'success',
            });

            // Fetch updated session
            const newSession = await getSession();
            console.log("Updated session:", newSession);
            // You can use this updated session if needed in your component

            router.refresh()
        } else {
            const errorResponse = await response.json();
            toast({
                title: "Error",
                description: errorResponse.message || "Failed to update profile.",
                variant: 'destructive',
            });
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-800">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                        placeholder='Enter your name'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-800">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type='email'
                                        className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                        placeholder='mail@example.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700' type='submit'>
                    Save Changes
                </Button>
            </form>
        </Form>
    );
};

export default EditProfileForm;
