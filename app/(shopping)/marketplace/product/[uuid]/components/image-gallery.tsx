"use client";
import Image from 'next/image';
import { X } from 'lucide-react'
import { useState } from 'react';
import { ProductImage } from '@/api';
import { ArrowPathIcon, ArrowsPointingOutIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
    images: {
        image: ProductImage;
    }[]
    coverImage?: ProductImage;
}

const Controls = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
        <div className="flex space-x-1 p-4 absolute top-0 right-0 z-10">
            <Button size={'xs'} variant={'outline'} onClick={() => zoomIn()}>
                <MagnifyingGlassPlusIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size={'xs'} variant={'outline'} onClick={() => zoomOut()}>
                <MagnifyingGlassMinusIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size={'xs'} variant={'outline'} onClick={() => resetTransform()}>
                <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size={'xs'} onClick={() => setOpen(false)}>
                <X className="h-4 w-4" aria-hidden="true" />
            </Button>
        </div>
    );
};
const ImageGallery = ({ images, coverImage }: ImageGalleryProps) => {
    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(coverImage?.original ?? '/images/placeholder.svg');

    const getImageDimensions = (url: string): { width: number; height: number } | null => {
        const match = url?.match(/(\d+)x(\d+)_q\d+_crop/)
        if (match) {
            return {
                width: parseInt(match[1], 10),
                height: parseInt(match[2], 10)
            }
        }
        return {
            width: 400,
            height: 400
        }
    }

    return (
        <div className='md:flex-row  flex-col-reverse flex gap-2 items-start'>
            <div className='flex flex-row md:flex-col gap-2 overflow-auto max-h-[25.5rem]'>
                {images.map((image, idx) => (
                    <div className="aspect-[1/1] max-h-24 overflow-hidden rounded-md bg-gray-200" key={idx}>
                        <Image height={getImageDimensions(image.image.medium)?.height} width={getImageDimensions(image.image.medium)?.width} onClick={() => setSelectedImage(image.image.original)} src={image.image.medium ?? '/images/placeholder.svg'} alt={coverImage?.original ?? 'Product Image'} className="object-cover object-center rounded-md shadow-sm hover:scale-110 transition cursor-pointer" />
                    </div>
                ))}
            </div>
            <div className="overflow-hidden max-h-[24rem] sm:max-h-[30rem] h-full w-full  md:aspect-2 rounded-lg relative bg-gray-200">
                <Image width={400} height={400} src={selectedImage} alt={coverImage?.original ?? 'Product Image'} className="object-cover h-full w-full object-center" />
                <button onClick={() => setOpen(true)} className='absolute top-0 right-0 p-2 m-2 rounded-md z-20 backdrop-blur-md hover:bg-white/50'>
                    <ArrowsPointingOutIcon className='h-6 w-6 text-white' />
                </button>
            </div>
            <Dialog className="relative z-30" open={open} onClose={setOpen}>
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in block" />
                <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center px-2 lg:px-4">
                        <DialogPanel transition className="relative overflow-hidden h-fit shadow-md  ring-1 ring-gray-700 flex text-left text-base aspect-[1/1]">
                            <TransformWrapper>
                                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                    <>
                                        <Controls setOpen={setOpen} />
                                        <TransformComponent>
                                            <div className='aspect-[1/1] bg-gray-100'>
                                            <Image width={400} height={400} src={selectedImage} alt={selectedImage ?? 'Product Image'} className="object-cover h-full w-full object-center" />
                                            </div>
                                        </TransformComponent>
                                    </>
                                )}
                            </TransformWrapper>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ImageGallery;
