"use client";
import { useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/text-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2, Upload } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function Component() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      productName: "",
      description: "",
      basePrice: 0,
      shop: "",
      category: "",
      brand: "",
      tags: [],
      variants: [{ price: 0, status: "", attribute: "", value: "" }],
      discounts: [{ name: "", discountPercent: 0, discountPrice: 0, startDate: new Date(), endDate: new Date() }]
    }
  })

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: "variants"
  })

  const { fields: discountFields, append: appendDiscount, remove: removeDiscount } = useFieldArray({
    control,
    name: "discounts"
  })

  const [coverImage, setCoverImage] = useState(null)
  const [productImages, setProductImages] = useState([])

  const onSubmit = (data) => {
    console.log(data)
    // Here you would typically send the data to your backend
  }

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setCoverImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleProductImagesUpload = (e) => {
    const files = Array.from(e.target.files)
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.readAsDataURL(file)
      })
    })
    Promise.all(readers).then(setProductImages)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" {...register("productName", { required: "Product name is required" })} />
              {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price</Label>
              <Input type="number" id="basePrice" {...register("basePrice", { valueAsNumber: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shop">Shop</Label>
              <Input id="shop" {...register("shop")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" {...register("brand")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" {...register("tags")} />
              <p className="text-sm text-muted-foreground">Enter tags separated by commas, e.g., "summer, casual, cotton"</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <div className="flex items-center space-x-4">
                <Input type="file" id="coverImage" className="hidden" onChange={handleCoverImageUpload} />
                <Label htmlFor="coverImage" className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg hover:bg-muted transition-colors">
                  {coverImage ? (
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </Label>
                <div className="flex-1">
                  <p className="text-sm font-medium">Upload cover image</p>
                  <p className="text-sm text-muted-foreground">This will be the main image for your product</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productImages">Product Images</Label>
              <div className="flex items-center space-x-4">
                <Input type="file" id="productImages" className="hidden" multiple onChange={handleProductImagesUpload} />
                <Label htmlFor="productImages" className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg hover:bg-muted transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </Label>
                <div className="flex-1">
                  <p className="text-sm font-medium">Upload product images</p>
                  <p className="text-sm text-muted-foreground">You can select multiple images</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {productImages.map((img, index) => (
                  <img key={index} src={img} alt={`Product ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variantFields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`variants.${index}.price`}>Price</Label>
                  <Input
                    type="number"
                    id={`variants.${index}.price`}
                    {...register(`variants.${index}.price`, { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`variants.${index}.status`}>Status</Label>
                  <Controller
                    name={`variants.${index}.status`}
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_stock">In Stock</SelectItem>
                          <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                          <SelectItem value="backordered">Backordered</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`variants.${index}.attribute`}>Attribute</Label>
                  <Input id={`variants.${index}.attribute`} {...register(`variants.${index}.attribute`)} />
                  <p className="text-sm text-muted-foreground">E.g., "Color", "Size", "Material"</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`variants.${index}.value`}>Value</Label>
                  <Input id={`variants.${index}.value`} {...register(`variants.${index}.value`)} />
                  <p className="text-sm text-muted-foreground">E.g., "Red", "Large", "Cotton"</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`variants.${index}.image`}>Variant Image</Label>
                <Input type="file" id={`variants.${index}.image`} />
              </div>

              <Button type="button" variant="destructive" onClick={() => removeVariant(index)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Variant
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendVariant({ price: 0, status: "", attribute: "", value: "" })}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Variant
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Discounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {discountFields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`discounts.${index}.name`}>Discount Name</Label>
                  <Input id={`discounts.${index}.name`} {...register(`discounts.${index}.name`)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`discounts.${index}.discountPercent`}>Discount Percent</Label>
                  <Input
                    type="number"
                    id={`discounts.${index}.discountPercent`}
                    {...register(`discounts.${index}.discountPercent`, { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`discounts.${index}.discountPrice`}>Discount Price</Label>
                  <Input
                    type="number"
                    id={`discounts.${index}.discountPrice`}
                    {...register(`discounts.${index}.discountPrice`, { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Controller
                    name={`discounts.${index}.startDate`}
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Controller
                    name={`discounts.${index}.endDate`}
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
              </div>

              <Button type="button" variant="destructive" onClick={() => removeDiscount(index)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Discount
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendDiscount({ name: "", discountPercent: 0, discountPrice: 0, startDate: new Date(), endDate: new Date() })}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Discount
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Create Product</Button>
    </form>
  )
}