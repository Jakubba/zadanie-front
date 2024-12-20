import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { ContentfulItem } from './../types/interface';
interface PersonSectionProps {
  item: ContentfulItem;
  image?: {
    fields: {
      file: { url: string };
      title: string;
    };
  };
  options: any;
}

const PersonSection: React.FC<PersonSectionProps> = ({ item, image, options }) => {
  return (
    <div className='flex flex-col'>
      <div className='text-center m-auto mt-[120px] mb-[240px] h-full w-full max-w-[900px] flex justify-start items-start min-h-[600px]'>
        {image && (
          <div className='flex justify-center w-[40%] h-auto mt-[-60px] mr-[-60px] z-20'>
            <Image
              className='object-contain w-full h-full'
              src={'https:' + image.fields.file.url}
              alt={image.fields.title}
              width={500}
              height={500}
            />
          </div>
        )}
        <div className='block-content bg-gradient-secondary h-full min-h-[600px] w-[60%] flex flex-col p-10 pl-24 z-10'>
          <h1 className='block-title mb-10'>{item.fields.title}</h1>
          <div className='block-desc mb-6'>
            {documentToReactComponents(item.fields.description, options)}
          </div>
          {item.fields.ctaLink && item.fields.ctaText && (
            <Link href={item.fields.ctaLink} className='btn btn-black'>
              {item.fields.ctaText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonSection;
