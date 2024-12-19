import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface ContentfulItem {
  fields: {
    title: string;
    backgroundGradient?: boolean;
    description: any;
  };
}

interface ContentBlokProps {
  item: ContentfulItem;

  options: any;
}

const ContentBlok: React.FC<ContentBlokProps> = ({ item, options }) => {
  return (
    <div className='block-two-image'>
      <div className='block-two-image-wrapper flex items-end'>
        <div className='block-content h-full w-full flex flex-col p-10'>
          <h1 className='block-title !max-w-[600px] blok mb-10'>{item.fields.title}</h1>
          <div className='ml-auto text-left w-[80%] mb-6'>
            {documentToReactComponents(item.fields.description, options)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBlok;
