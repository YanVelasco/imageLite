'use client';

import React, {useEffect, useState} from "react";
import {Template} from '@/components/Template';
import {ImageCard} from '@/components/ImageCard';
import {useImageService} from '@/resources/image/image.service';
import {ImageResponse} from '@/resources/image/image.resource';
import {motion} from "framer-motion";

const imageExtensions = [
    {label: 'All formats', value: ''},
    {label: 'PNG', value: 'png'},
    {label: 'JPEG', value: 'jpeg'},
    {label: 'SVG', value: 'svg'},
    {label: 'GIF', value: 'gif'},
    {label: 'BMP', value: 'bmp'},
    {label: 'TIFF', value: 'tiff'},
    {label: 'WebP', value: 'webp'},
    {label: 'HEIF', value: 'heif'},
    {label: 'AVIF', value: 'avif'},
];

export default function Page() {
    const imageService = useImageService();
    const [images, setImages] = useState<ImageResponse[]>([]);
    const [extension, setExtension] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    async function getImages() {
        try {
            const normalizedExtension = extension.toLowerCase(); // Normaliza a extensão para minúsculas
            const result = await imageService.getImages(normalizedExtension, query);
            setImages(result);
            setError(null);
        } catch (error: any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getImages();
    }, [extension, query]);

    function renderingImagesCard() {
        return images.map((image, index) => (
            <motion.div
                key={image.url}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: index * 0.2}}
            >
                <ImageCard
                    title={image.name}
                    size={image.size}
                    dateUploaded={image.uploadedAt?.toString()}
                    imageUrl={image.url}
                    extension={image.extension}
                />
            </motion.div>
        ));
    }

    return (
        <Template>
            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <select
                        value={extension}
                        onChange={(e) => setExtension(e.target.value)}
                        className="mr-2 p-2 border border-gray-300 text-gray-900"
                    >
                        {imageExtensions.map(ext => (
                            <option key={ext.value} value={ext.value}>
                                {ext.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Search images..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg text-gray-900"
                    />
                    <button
                        onClick={getImages}
                        className="ml-2 p-2 bg-blue-500 text-white hover:bg-blue-700"
                    >
                        Search
                    </button>
                    <button
                        className="ml-2 p-2 bg-yellow-500 text-white hover:bg-yellow-700"
                    >
                        Add new image
                    </button>
                </div>
            </section>
            {error && <div className="text-red-500">{error}</div>}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {renderingImagesCard()}
            </section>
        </Template>
    );
}