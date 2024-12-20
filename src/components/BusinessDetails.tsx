'use client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { ImageFields, ContentfulItem } from './../types/interface';
export interface BusinessDetailsProps {
  item: ContentfulItem;
  mainImage?: { fields: ImageFields };
  leftSmallImage?: { fields: ImageFields };
  rightSmallImage?: { fields: ImageFields };
}

const SmallImage: FC<{ image: ImageFields }> = ({ image }) => (
  <div>
    <Image
      src={`https:${image.file.url}`}
      alt={image.title || 'Small Image'}
      width={500}
      height={500}
      priority
      className='rounded-md shadow-md'
    />
  </div>
);

const BusinessDetails: FC<BusinessDetailsProps> = ({
  item,
  mainImage,
  leftSmallImage,
  rightSmallImage,
}) => {
  const {
    title,
    ctaLink,
    ctaText,
    description,
    dataOpen,
    gradientBackground = false,
    mainImagePosition = false,
  } = item.fields;

  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const gradientClass = gradientBackground ? 'bg-gradient-primary' : '';
  const imagePosition = mainImagePosition ? 'mt-[-80px] h-max' : 'h-full';
  const backgroundSize = mainImagePosition
    ? 'object-contain h-max'
    : 'object-cover h-full';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <div className='flex flex-col'>
      <div
        className={`block-two-image-wrapper h-full w-full max-w-[900px] min-h-[600px] flex flex-col items-center justify-center`}
      >
        <div
          className={`w-full h-full flex flex-row justify-center z-10 min-h-[650px] ${gradientClass} pt-10 pl-10`}
        >
          <div
            ref={contentRef}
            className={`block-content h-full flex flex-col w-[50%] pr-10 fade-in-up ${
              isVisible ? 'visible' : ''
            }`}
          >
            <h1 className='block-title mb-8 pt-10'>{title}</h1>
            {description && (
              <div className='text-left w-[90%] mb-6'>
                {documentToReactComponents(description)}
              </div>
            )}
            {dataOpen && (
              <div className='text-left w-full mb-6'>
                {documentToReactComponents(dataOpen)}
              </div>
            )}
            {ctaLink && ctaText && (
              <Link href={ctaLink} className='btn btn-orange mt-10'>
                {ctaText}
              </Link>
            )}
          </div>
          {mainImage && (
            <div
              className={`flex justify-center w-[50%] h-auto shadow-custom-shadow ${imagePosition} `}
            >
              <Image
                className={`w-full h-auto ${backgroundSize}`}
                src={`https:${mainImage.fields.file.url}`}
                alt={mainImage.fields.title || 'Main Image'}
                width={500}
                height={500}
                priority
              />
            </div>
          )}
        </div>
        {(leftSmallImage || rightSmallImage) && (
          <div className='w-max mt-[-60px] z-10 max-w-[250px] flex flex-row gap-4'>
            {leftSmallImage && <SmallImage image={leftSmallImage.fields} />}
            {rightSmallImage && <SmallImage image={rightSmallImage.fields} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDetails;
