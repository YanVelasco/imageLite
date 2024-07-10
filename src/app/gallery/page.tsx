'use client';

import React, {useEffect, useState } from "react";
import { TemplateDefault } from '@/components/templateDefault/Template';
import { ImageCard } from '@/components/imageCard/ImageCard';
import { useImageService } from '@/resources/image/image.service';
import { ImageResponse } from '@/resources/image/image.resource';
import { motion } from "framer-motion";
import { Button } from "@/components/button/Button";
import { LinkButton } from "@/components/linkButton/LinkButton";
import { Input } from "@/components/input/Input";
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
    const [isLoading, setIsLoading] = useState(false);

    async function getImages() {
        try {
            setIsLoading(true);
            const normalizedExtension = extension.toLowerCase();
            const result = await imageService.getImages(normalizedExtension, query);
            setImages(result);
            setIsLoading(false);
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
        <TemplateDefault loading={isLoading}>
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
                    <Input
                        type="text"
                        placeholder="Search images..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg text-gray-900"
                        borderColor="gray"
                        textColor="gray"
                        onEnterPress={getImages} // Adiciona a função getImages ao pression
                    />
                    <Button onClick={getImages} bgColor="blue" textColor="text-white">
                        Search
                    </Button>
                    <LinkButton href="/form" bgColor="yellow" textColor="text-white">
                        Add new image
                    </LinkButton>
                </div>
            </section>
            {error && <div className="text-red-500">{error}</div>}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {renderingImagesCard()}
            </section>
        </TemplateDefault>
    );
}