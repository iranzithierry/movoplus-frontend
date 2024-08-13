"use client"
import AddProductHeader from "./_components/header"
import AddDetailsFormCard from "./_components/form-cards/details-form-card"
import AddStatusFormCard from "./_components/form-cards/status-form-card"
import FormCard from "./_components/form-cards/form-card"
import AddCategoryFormCard from "./_components/form-cards/category-form-card"
import AddVariantsFormCard from "./_components/form-cards/variants-form-card"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import UploadeImageFormCard from "./_components/form-cards/upload-form-card"


export default function Page() {
    const [showVariantsForm, setShowVariantsForm] = useState<boolean>(false);
    return (
        <section className="flex-1 flex flex-col gap-y-6">
            <AddProductHeader />
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <FormCard>
                        <AddDetailsFormCard />
                    </FormCard>
                    <FormCard title="Category">
                        <AddCategoryFormCard />
                    </FormCard>
                    <FormCard title="Variants">
                        {!showVariantsForm ? (
                            <button onClick={() => setShowVariantsForm(true)} className="flex hover:underline hover:underline-offset-2 outline-none text-sm gap-x-1 items-center">
                                <PlusCircle className="size-3.5" />
                                <p>Add options like size or color</p>
                            </button>
                        ) : (
                            <AddVariantsFormCard />
                        )}
                    </FormCard>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <FormCard title="Status">
                        <AddStatusFormCard />
                    </FormCard>
                    <FormCard title="Images">
                        <UploadeImageFormCard />
                    </FormCard>
                </div>
            </div>
        </section>
    )
}
