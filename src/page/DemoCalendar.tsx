import React from 'react';
import Calendar from '@/component/Calendar';
import Layout from '@/component/Layout';

const DemoCalendar = (): JSX.Element => {
  return (
    <Layout>
      <h1 className="mb-5 text-stone-100 text-4xl">
        Calendar
      </h1>
      <div>
        <Calendar />
      </div>
    </Layout>
  );
}

export default DemoCalendar;
