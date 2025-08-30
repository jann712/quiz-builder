'use client'
import { useForm, SubmitHandler, useFieldArray, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const QuestionField = ({
    control,
    index,
    register
}: {
    control: Control<FormValues>
    index: number
}) => {
    const output = useWatch({
        name: 'question',
        control,
        defaultValue: ''
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'checkbox',
    })

    return (
        <>
            {output[index]?.type === 'checkbox' && (
                <>
                    {
                        fields.map((question, index) => (
                            <div className='border border-slate-200 p-6 px-8 gap-2 flex flex-col'>

                                <Input placeholder='Type your checkbox option' {...register(`checkbox[${index}].option`)}></Input>
                                <Button className='bg-red-600 text-white' onClick={() => remove(index)}>Remove checkbox option</Button>
                            </div>
                        ))
                    }

                    <Button onClick={() => append({})}>Add checkbox options</Button>
                </>
            )}
        </>
    )
}

export default function Create() {
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/quizzes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => console.log(response))
            .catch((error) => console.error(error))
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: "question"
    })
    return (
        <div className='flex justify-center h-dvh items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='gap-3 text-center flex flex-col border-2 border-slate-300 rounded-lg p-8 h-fit min-h-3/4 w-2/5 justify-center items-center'>
                <h2 className='text-2xl font-bold'>Quiz Builder</h2>
                <label htmlFor="title">Quiz Title</label>
                <Input type="text" {...register("title")} />




                {fields.map((question, index) => <div className='border border-slate-200 p-6 px-8 flex flex-col gap-3'>
                    <Label>Question name</Label>
                    <Input type='input'  {...register(`question[${index}].name`)} />

                    <div className='flex gap-8'>
                        <div className='flex gap-1'>
                            <Input className='w-fit' type='radio' value="boolean" {...register(`question[${index}].type`)} />
                            <Label>Boolean</Label>
                        </div>
                        <div className='flex gap-1'>
                            <Input className='w-fit' type='radio' value="input" {...register(`question[${index}].type`)} />
                            <Label>Input</Label>
                        </div>
                        <div className='flex gap-1'>
                            <Input className='w-fit' type='radio' value="checkbox" {...register(`question[${index}].type`)} />
                            <Label>Checkbox</Label>
                        </div>
                    </div>
                    <QuestionField control={control} index={index} register={register} />

                    <Button onClick={() => remove(index)} className='bg-red-600'>Remove the field</Button>
                </div>)}

                <Button onClick={() => append({})}>Add more questions</Button>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}