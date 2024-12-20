import HomeComponent from '@/components/Home';
import PersonSection from '@/components/PersonSection';
import ContentBlok from '@/components/ContentBlok';
import BannerInfo from '@/components/BannerInfo';
import BusinessDetails from '@/components/BusinessDetails';
import BannerWithFiles from '@/components/BannerWithFiles';

const url = `${process.env.BASE_URL}/spaces/${process.env.SPACE_ID}/environments/master/entries?access_token=${process.env.ACCESS_TOKEN}`;

const options = {
  renderText: (text: any) => {
    return text.split('\n').reduce((children: any, textSegment: any, index: any) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export default async function HomePage() {
  try {
    const response = await fetch(url, { cache: 'no-cache' });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return (
      <>
        {data.items.map((item: any, index: any) => {
          const contentType = item.sys.contentType.sys.id;

          if (contentType === 'home') {
            const imageTop = data.includes?.Asset?.find(
              (asset: any) => asset.sys.id === item.fields.imageTop?.sys.id
            );
            const imageBottom = data.includes?.Asset?.find(
              (asset: any) => asset.sys.id === item.fields.imageBottom?.sys.id
            );

            return (
              <HomeComponent
                key={index}
                item={item}
                imageTop={imageTop}
                imageBottom={imageBottom}
              />
            );
          } else if (contentType === 'personSection') {
            const image = data.includes?.Asset?.find(
              (asset: any) => asset.sys.id === item.fields.image?.sys.id
            );

            return (
              <PersonSection key={index} item={item} image={image} options={options} />
            );
          } else if (contentType === 'banerInfo') {
            const mainImage = data.includes?.Asset?.find(
              (asset: any) => asset.sys.id === item.fields.mainImage?.sys.id
            );
            const bottomImage = data.includes?.Asset?.find(
              (asset: any) => asset.sys.id === item.fields.bottomImage?.sys.id
            );

            return (
              <BannerInfo
                key={index}
                item={item}
                mainImage={mainImage}
                bottomImage={bottomImage}
              />
            );
          } else if (contentType === 'businessDetails') {
            const mainImage = data.includes?.Asset?.find(
              (asset: any) => asset.sys.id === item.fields.mainImage?.sys.id
            );
            const rightSmallImage = data.includes?.Asset?.find(
              (asset: any) => asset.sys.id === item.fields.rightSmallImage?.sys.id
            );
            const leftSmallImage = data.includes?.Asset?.find(
              (asset: any) => asset.sys.id === item.fields.leftSmallImage?.sys.id
            );

            return (
              <BusinessDetails
                key={index}
                item={item}
                mainImage={mainImage}
                rightSmallImage={rightSmallImage}
                leftSmallImage={leftSmallImage}
              />
            );
          } else if (contentType === 'contentBlok') {
            return <ContentBlok key={index} item={item} options={options} />;
          } //  else if (contentType === 'banerWithFiles') {
          //   const imageTop = data.includes?.Asset?.find(
          //     (asset: any) => asset.sys.id === item.fields.imageTop?.sys.id
          //   );
          //   const imageBottom = data.includes?.Asset?.find(
          //     (asset: any) => asset.sys.id === item.fields.imageBottom?.sys.id
          //   );
          //   const firstFileMedia = data.includes?.Asset?.find(
          //     (asset: any) => asset.sys.id === item.fields.firstFileMedia?.sys.id
          //   );
          //   const secondFileMedia = data.includes?.Asset?.find(
          //     (asset: any) => asset.sys.id === item.fields.secondFileMedia?.sys.id
          //   );

          //   return (
          //     <BannerWithFiles
          //       key={index}
          //       item={item}
          //       imageTop={imageTop}
          //       imageBottom={imageBottom}
          //       firstFileMedia={firstFileMedia}
          //       secondFileMedia={secondFileMedia}
          //     />
          //   );
          // }
          return null;
        })}
      </>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Failed to load data. Please try again later.</div>;
  }
}
