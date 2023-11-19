"use client"

import { Color } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"

import Heading from '@/components/ui/heading'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/alert-modal"

interface ColorFormProps {
    initialData: Color | null;  // we are passing the Store as initialData
}

// we will use zod TypeScript-first schema validation
const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: "String mush be a valid hex code"
    })

})

type ColorFormValues = z.infer<typeof formSchema>

const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {

    const params = useParams()
    console.log(params)
    console.log("[COLOR_ID ==> ", params.colorId)

    const router = useRouter();
    console.log(router)


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit Color" : "Create Color";
    const description = initialData ? "Edit a Color" : "Add a new Color";
    const toastMessage = initialData ? "Color Updated" : "Color Created";
    const action = initialData ? "Save changes" : "Create";


    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    })


    const onSubmit = async (data: ColorFormValues) => {
        console.log(data)
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data);
            }
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success(toastMessage)


        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)

        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success("Color deleted")

        } catch (error) {
            toast.error("Make sure you removed all Products using this Color.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (

        // encapsulating in a fragment
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}

            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                        disabled={loading}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Color name..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder="Color value..." {...field} />
                                            <div
                                                className="border p-4 rounded-full"
                                                style={{ backgroundColor: field.value }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )

}

export default ColorForm