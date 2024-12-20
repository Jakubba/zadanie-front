import { FC } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { ContentfulItem, ImageFields } from './../types/interface';

interface HomeProps {
  item: ContentfulItem;
  imageTop?: { fields: ImageFields };
  imageBottom?: { fields: ImageFields };
}

const Home: FC<HomeProps> = ({ item, imageTop, imageBottom }) => {
  const gradientClass = item.fields.backgroundGradient ? 'bg-gradient-primary' : '';
  const imageTopClass = item.fields.positionImages ? 'image-top' : 'image-left-top';
  const imageBottomClass = item.fields.positionImages
    ? 'image-bottom'
    : 'image-left-bottom';
  const blockContentClass = item.fields.positionImages ? 'w-full' : 'block-content-right';
  const blockSide = item.fields.positionImages ? '' : 'items-end';

  return (
    <div className={`flex flex-col`}>
      <div
        className={`relative w-full max-w-[900px] h-full flex flex-col justify-start min-h-[600px] p-20 m-auto mt-[120px] mb-[240px] ${gradientClass} ${blockSide}`}
      >
        <div className={`block-content h-full flex flex-col ${blockContentClass}`}>
          <h1 className='block-title mb-8'>{item.fields.title}</h1>
          <div className='block-desc mb-6'>
            {documentToReactComponents(item.fields.body)}
          </div>
          {item.fields.ctaLink && item.fields.ctaText && (
            <Link href={item.fields.ctaLink} className='btn btn-orange'>
              {item.fields.ctaText}
            </Link>
          )}
        </div>
        {imageTop && (
          <div className={`flex justify-center absolute ${imageTopClass}`}>
            <Image
              src={`https:${imageTop.fields.file.url}`}
              alt={imageTop.fields.title}
              width={500}
              height={500}
              priority
            />
          </div>
        )}
        {imageBottom && (
          <div className={`flex justify-center absolute ${imageBottomClass}`}>
            <Image
              src={`https:${imageBottom.fields.file.url}`}
              alt={imageBottom.fields.title}
              width={500}
              height={500}
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
