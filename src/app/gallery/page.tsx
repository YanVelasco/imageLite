'use client';

import React, {useEffect, useState} from "react";
import {Template} from '@/components/Template';
import {ImageCard} from '@/components/ImageCard';
import {useImageService} from '@/resources/image/image.service';
import {ImageResponse} from '@/resources/image/image.resource';
import {motion} from "framer-motion";

export default function Page() {
    const imageService = useImageService();
    const [images, setImages] = useState<ImageResponse[]>([]);

    async function getImages() {
        const images = await imageService.getImages();
        setImages(images);
    }

    useEffect(() => {
        getImages();
    }, []);

    function renderingImagesCard() {
        return images.map((image, index) => (
            <motion.div
                key={image.url}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: index * 0.2}} // Stagger the animation
            >
                <ImageCard
                    title={image.name}
                    width={image.size}
                    dateUploaded={image.uploadedAt?.toString()}
                    imageUrl={image.url}
                />
            </motion.div>
        ));
    }

    return (
        <Template>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {renderingImagesCard()}
            </section>
        </Template>
    );
}