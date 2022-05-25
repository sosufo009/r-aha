import Calendar from '../component/Calendar';
import Layout from '../component/Layout';

function DemoCalendar() {
  const handleCancelEvent = () => {
    console.log("Click cancel");
  }
  const handleConfirmEvent = () => {
    console.log("Click OK");
  }
  return (
    <Layout>
      <h1 className="mb-5 text-stone-100 text-4xl">
        Calendar
      </h1>
      <div>
        <Calendar
          titleText="text"
          cancelObj={{
            title: "Cancel",
            fn: handleCancelEvent
          }}
          confirmObj={{
            title: "OK",
            fn: handleConfirmEvent
          }}
        />
      </div>
    </Layout>
  );
}

export default DemoCalendar;
