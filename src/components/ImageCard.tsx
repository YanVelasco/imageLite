import React from "react";

interface ImageCardProps {
    title?: string;
    size?: number;
    dateUploaded?: string;
    imageUrl?: string;
}

export class ImageCard extends React.Component<ImageCardProps> {
    render() {
        let {
            title,
            size,
            dateUploaded,
            imageUrl
        } = this.props;

        function downloadImage() {
            window.open(imageUrl, "_blank");
        }

        return (
            <div className="mt-8 p-4 hover:cursor-pointer">
                <h2 className="card relative bg-white-100 rounded-md transition-transform ease-in duration-500 hover:scale-105 transform hover:shadow-lg hover:translate-y-2">
                    <img className="h-56 w-full object-cover rounded-t-md" alt={title}
                         src={imageUrl}/>
                    <div className="card-body p-4">
                        <h5 className="text-xl font-semibold mb-2 text-gray-600">
                            {title}
                        </h5>
                        <p className="text-gray-600">
                            {size}
                        </p>
                        <p className="text-gray-600">
                            {dateUploaded}
                        </p>
                        <button onClick={downloadImage}
                                className="absolute bottom-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-md text-sm m-4 hover:bg-blue-700">
                            Download
                        </button>
                    </div>
                </h2>
            </div>
        );
    }
}