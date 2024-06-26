import MainSection from './MainSection/MainSection';

export default function Home() {
  return (
    <>
      <div className="mainHeader bg-neutral-800 text-white text-center p-[50px] h-[500px] flex justify-center items-center">
        <div>
          <h1 className="text-[65px]">Latest Blogs and Reviews</h1>
          <p className="text=[20px]">
            Read all about your favorite TV shows, New Tech, and much more!
          </p>
        </div>
      </div>
      <MainSection />
    </>
  );
}
