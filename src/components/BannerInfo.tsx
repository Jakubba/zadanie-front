import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

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
    body?: any;
    backgroundGradient?: boolean;
    positionImages?: boolean;
  };
}

interface BannerInfoProps {
  item: ContentfulItem;
  mainImage?: { fields: ImageFields };
  bottomImage?: { fields: ImageFields };
}

const BannerInfo: FC<BannerInfoProps> = ({ item, mainImage, bottomImage }) => {
  const gradientClass = item.fields.backgroundGradient ? 'bg-gradient-primary' : '';
  const imageBottomClass = item.fields.positionImages
    ? 'image-bottom'
    : 'image-left-bottom';
  const blockContentClass = item.fields.positionImages ? 'w-full' : 'block-content-right';
  const blockSide = item.fields.positionImages ? '' : 'items-end';
  return (
    <div className={`block-two-image`}>
      <div
        className={`block-two-image-wrapper min-h-[600px] p-20 ${gradientClass} ${blockSide}`}
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
        {mainImage && (
          <div className={`flex justify-center`}>
            <Image
              src={`https:${mainImage.fields.file.url}`}
              alt={mainImage.fields.title}
              width={500}
              height={500}
              priority
            />
          </div>
        )}
        {bottomImage && (
          <div className={`flex justify-center absolute ${imageBottomClass}`}>
            <Image
              src={`https:${bottomImage.fields.file.url}`}
              alt={bottomImage.fields.title}
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

export default BannerInfo;
