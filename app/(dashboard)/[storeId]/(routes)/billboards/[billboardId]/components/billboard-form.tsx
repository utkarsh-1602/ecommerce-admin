"use client"

import { Billboard, Store } from "@prisma/client"
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
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"

interface BillboardFormProps {
    initialData: Billboard | null;  // we are passing the Store as initialData
}

// we will use zod TypeScript-first schema validation
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)

})

type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {

    const params = useParams()
    console.log(params)

    const router = useRouter();
    console.log(router)

    const origin = useOrigin();


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
    const toastMessage = initialData ? "Billboard Updated" : "Billboard Created";
    const action = initialData ? "Save changes" : "Create";


    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    })


    const onSubmit = async (data: BillboardFormValues) => {
        console.log(data)
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh()
            toast.success("Store Updated Successfully")

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)

        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh()
            router.push("/")
            toast.success("Store Deleted Successfully")

        } catch (error) {
            toast.error("Make sure you removed all products and categories first")
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
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label..." {...field} />
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
            <Separator />
        </>
    )

}

export default BillboardForm