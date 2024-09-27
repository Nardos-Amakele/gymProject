import BMIComponent from "./BMIcalculator";

const Supporting = () => {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-[9rem] pb-20 font-jost">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-8">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl font-bold mb-4">Every rep brings <br />you closer to greatness</h2>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <BMIComponent />
        </div>
      </div>
    </section>
  );
};

export default Supporting;