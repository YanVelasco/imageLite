import { ImageResponse } from './image.resource';

class ImageService {
    baseUrl = 'http://localhost:8080/v1/images';

    async getImages(extension?: string, query?: string): Promise<ImageResponse[]> {
        const url = new URL(this.baseUrl);
        if (extension) url.searchParams.append('extension', extension);
        if (query) url.searchParams.append('query', query);


        const response = await fetch(url.toString());

        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    }

    async saveImage(data: FormData): Promise<String> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.headers.get('Location') ?? '';
    }
}

export const useImageService = () => {
    return new ImageService();
}
