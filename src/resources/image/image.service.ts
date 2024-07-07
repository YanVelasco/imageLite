import {ImageResponse} from './image.resource';

class ImageService{
    baseUrl = 'http://localhost:8080/v1/images';

    async getImages(): Promise<ImageResponse[]> {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }
}

export const useImageService = () => {
    return new ImageService();
}