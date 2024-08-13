"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type VariantsType = {
    variantKey: string,
    variantValue: string
};

export default function AddVariantsFormCard({ variants }: { variants?: VariantsType[] | null }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants"
    });

    const onSubmit = async (data: any) => { };

    const initialFieldCreated = useRef(false)
    if (!initialFieldCreated.current) {
        append({ variantKey: "", variantValue: "" });
        initialFieldCreated.current = true;
    }
    const handleAddVariant = () => {
        append({ variantKey: "", variantValue: "" });
    };
    useEffect(() => {
        if (variants) {
            variants.map((variant, index) => {
                append({ variantKey: variant.variantKey, variantValue: variant.variantValue });
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variants])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                {fields.map((variant, index) => (
                    <div key={variant.id} className="grid grid-cols-[1fr_1fr_auto] gap-4">
                        <div>
                            <Select {...register(`variants.${index}.key`, { required: { value: true, message: "Variant Key is required" } })}>
                                <SelectTrigger id={`variants.${index}.key`} aria-label="Select variant">
                                    <SelectValue  placeholder="Select key" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="size">Size</SelectItem>
                                    <SelectItem value="color">Color</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* @ts-ignore */}
                            {errors.variants?.[index]?.key && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors.variants[index].key.message}</span>}
                        </div>
                        <div>
                            <Input
                                placeholder="XL"
                                {...register(`variants.${index}.value`, { required: { value: true, message: "Value is required" } })}
                            />
                            {/* @ts-ignore */}
                            {errors.variants?.[index]?.value && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors.variants[index].value.message}</span>}
                        </div>
                        <div className='flex gap-1'>
                            <Button type='button' size="icon" variant="outline" onClick={handleAddVariant}>
                                <PlusIcon className="w-5 h-5" />
                            </Button>
                            <Button type='button' size="icon" variant="destructive" onClick={() => remove(index)}>
                                <TrashIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </form>
    );
}
