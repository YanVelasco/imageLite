import React from "react";

interface ImageCardProps {
    title?: string;
    size?: number; // Size in bytes
    dateUploaded?: string;
    imageUrl?: string;
}

export class ImageCard extends React.Component<ImageCardProps> {

    // Função utilitária para converter bytes em MB ou KB
    formatFileSize = (bytes: number): string => {
        const KB = 1024;
        const MB = 1024 * KB;
        if (bytes >= MB) {
            return (bytes / MB).toFixed(2) + ' MB';
        } else if (bytes >= KB) {
            return (bytes / KB).toFixed(2) + ' KB';
        } else {
            return bytes + ' bytes';
        }
    };

    // Função utilitária para formatar a data
    formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(date);
    };

    downloadImage = () => {
        window.open(this.props.imageUrl, "_blank");
    };

    render() {
        const {
            title,
            size,
            dateUploaded,
            imageUrl
        } = this.props;

        return (
            <div className="mt-8 p-4 hover:cursor-pointer">
                <h2 className="card relative bg-white-100 rounded-md transition-transform ease-in duration-500 hover:scale-105 transform hover:shadow-lg hover:translate-y-2">
                    <img className="h-56 w-full object-cover rounded-t-md" alt={title} src={imageUrl}/>
                    <div className="card-body p-4">
                        <h5 className="text-xl font-semibold mb-2 text-gray-600">
                            {title}
                        </h5>
                        <p className="text-gray-600">
                            {size ? this.formatFileSize(size) : 'Unknown size'}
                        </p>
                        <p className="text-gray-600">
                            {dateUploaded ? this.formatDate(dateUploaded) : 'Unknown upload date'}
                        </p>
                        <button onClick={this.downloadImage}
                                className="absolute bottom-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-md text-sm m-4 hover:bg-blue-700">
                            Download
                        </button>
                    </div>
                </h2>
            </div>
        );
    }
}