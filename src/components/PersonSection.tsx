import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';

interface FileFields {
  url: string;
}

interface ImageFields {
  file: FileFields;
  title: string;
}

interface ContentfulItem {
  fields: {
    title: string;
    ctaLink?: string;
    ctaText?: string;
    backgroundGradient?: boolean;
    description: any;
  };
}

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
    <div className='block-two-image'>
      <div className='block-two-image-wrapper min-h-[600px] flex items-end'>
        <div className='block-content bg-gradient-secondary h-full min-h-[600px] w-[60%] flex flex-col p-10 pl-24'>
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
        {image && (
          <Image
            className='image-left flex justify-center absolute'
            src={'https:' + image.fields.file.url}
            alt={image.fields.title}
            width={500}
            height={500}
          />
        )}
      </div>
    </div>
  );
};

export default PersonSection;
