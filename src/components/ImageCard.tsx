import React from "react";

interface ImageCardProps {
    title?: string;
    width?: number;
    dateUploaded?: string;
    imageUrl?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
                                                        title,
                                                        width,
                                                        dateUploaded,
                                                        imageUrl
                                                    }) => {
    return (
        <div className="mt-8 p-4 hover:cursor-pointer">
            <h2 className="card relative bg-white-100 rounded-md transition-transform ease-in duration-500 hover:scale-105 transform hover:shadow-lg hover:translate-y-2">
                <img className="h-56 w-full object-cover rounded-t-md" alt=""
                     src= {imageUrl}/>
                <div className="card-body p-4">
                    <h5 className="text-xl font-semibold mb-2 text-gray-600">
                        {title}
                    </h5>
                    <p className="text-gray-600">
                        {width}
                    </p>
                    <p className="text-gray-600">
                        {dateUploaded}
                    </p>
                </div>
            </h2>
        </div>
    );
}