import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ContentfulItem } from './../types/interface';
interface ContentBlokProps {
  item: ContentfulItem;
  options: any;
}

const ContentBlok: React.FC<ContentBlokProps> = ({ item, options }) => {
  const gradientClass = item.fields.backgroundGradient ? 'bg-gradient-primary' : '';
  return (
    <div className='flex flex-col'>
      <div
        className={`flex flex-col items-end text-center max-w-[900px] m-auto mb-[240px] mt-[120px] ${gradientClass}`}
      >
        <div className='h-full w-full flex flex-col p-10'>
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
