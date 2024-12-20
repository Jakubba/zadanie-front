import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ContentfulItem, ImageFields } from './../types/interface';
interface BannerInfoProps {
  item: ContentfulItem;
  mainImage?: { fields: ImageFields };
  bottomImage?: { fields: ImageFields };
}

const BannerInfo: FC<BannerInfoProps> = ({ item, mainImage, bottomImage }) => {
  const gradientClass = item.fields.gradientBackground ? 'bg-gradient-primary' : '';
  const blockSide = item.fields.positionImages
    ? 'items-center justify-center'
    : 'items-center justify-center';
  const contentPosition = item.fields.positionImages ? 'flex-row-reverse' : '';
  const paddingImage = item.fields.positionImages ? '' : 'pt-[40px]';
  return (
    <div className={`flex flex-col`}>
      <div
        className={`block-two-image-wrapper h-full w-full max-w-[900px] min-h-[600px] flex flex-col  ${blockSide}`}
      >
        <div
          className={`w-full h-full flex flex-row justify-center z-10 ${contentPosition} ${gradientClass}`}
        >
          <div className={`block-content h-full flex flex-col w-[60%] px-10`}>
            <h1 className='block-title mb-8 p-2'>{item.fields.title}</h1>
            <div className='text-left w-[90%] mb-6'>
              {documentToReactComponents(item.fields.description)}
            </div>
            {item.fields.ctaLink && item.fields.ctaText && (
              <Link href={item.fields.ctaLink} className='btn btn-orange'>
                {item.fields.ctaText}
              </Link>
            )}
          </div>
          {mainImage && (
            <div className={`flex justify-center w-[40%] h-auto ${paddingImage}`}>
              <Image
                className='w-full h-auto'
                src={`https:${mainImage.fields.file.url}`}
                alt={mainImage.fields.title}
                width={500}
                height={500}
                priority
              />
            </div>
          )}
        </div>
        {bottomImage && (
          <div className={`w-max mt-[-60px] z-1 max-w-[250px]`}>
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
