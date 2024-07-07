import {Template} from '@/components/Template'
import {ImageCard} from '@/components/ImageCard'

export default function Page() {
    return (
        <div>
            <Template>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <ImageCard/>
                    <ImageCard/>
                    <ImageCard/>
                    <ImageCard/>
                    <ImageCard/>
                    <ImageCard/>
                </section>
            </Template>
        </div>
    )
}