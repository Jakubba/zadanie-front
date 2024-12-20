'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { IconDownload } from './IconDownload';
import { ContentfulItem, ImageFields } from './../types/interface';
interface BannerWithFilesProps {
  item: ContentfulItem;
  imageTop?: { fields: ImageFields };
  imageBottom?: { fields: ImageFields };
  firstFileMedia: any;
  secondFileMedia: any;
}

const DocumentToReactComponents = dynamic(
  () =>
    import('@contentful/rich-text-react-renderer').then(
      (mod) => mod.documentToReactComponents as (document: any) => React.ReactNode
    ),
  { ssr: false }
);

const BannerWithFiles = ({
  item,
  imageTop,
  imageBottom,
  firstFileMedia,
  secondFileMedia,
}: BannerWithFilesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageTopRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageBottomRef = useRef<HTMLDivElement>(null);
  const isImageTopInView = useInView(imageTopRef, '0px');
  const isContentInView = useInView(contentRef, '0px');
  const isImageBottomInView = useInView(imageBottomRef, '0px');

  const gradientClass = item.fields.backgroundGradient ? '' : 'bg-gradient-secondary';
  const blockContentClass = item.fields.positionImages ? 'w-full' : 'block-content-right';

  return (
    <div className={`block-two-image`} ref={containerRef}>
      <div
        className={`text-center m-auto mt-[120px] mb-[240px] w-full h-full max-w-[900px] flex flex-col justify-start min-h-[300px] ${gradientClass}`}
      >
        <div className='flex'>
          {imageTop && (
            <div className={`flex justify-center z-10 mt-[-60px]`} ref={imageTopRef}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={isImageTopInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <Image
                  src={`https:${imageTop.fields.file.url}`}
                  alt={imageTop.fields.title}
                  width={500}
                  height={500}
                  priority
                />
              </motion.div>
            </div>
          )}
          <div
            className={`block-content h-full flex flex-col p-10 ${blockContentClass} z-8`}
            ref={contentRef}
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={isContentInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
            >
              <h1 className='block-title mb-8'>{item.fields.title}</h1>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={isContentInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
            >
              <div className='block-desc mb-6'>
                {DocumentToReactComponents &&
                  item.fields.description &&
                  DocumentToReactComponents(item.fields.description)}
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={isContentInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2.5, ease: 'easeOut' }}
            >
              <div className='flex gap-6'>
                {item.fields.firstNameFile && (
                  <Link
                    href={firstFileMedia?.fields.file.url}
                    download
                    className='link flex gap-2 transition-colors duration-300 text-[#f5940c] hover:text-black'
                  >
                    {item.fields.firstNameFile}
                    <IconDownload />
                  </Link>
                )}
                {item.fields.secondNameFile && (
                  <Link
                    href={secondFileMedia?.fields.file.url}
                    download
                    className='link flex gap-2 transition-colors duration-300 text-[#f5940c] hover:text-black'
                  >
                    {item.fields.secondNameFile}
                    <IconDownload />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        {imageBottom && (
          <div
            className={`flex justify-center w-max max-w-[350px] z-2 mt-[-120px] max-h-[250px] ml-[-80px]`}
            ref={imageBottomRef}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={isImageBottomInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
            >
              <Image
                className='object-contain'
                src={`https:${imageBottom.fields.file.url}`}
                alt={imageBottom.fields.title}
                width={500}
                height={500}
                priority
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerWithFiles;
