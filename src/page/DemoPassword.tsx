import Password from '../component/Password';
import Layout from '../component/Layout';

const DemoPassword = (): JSX.Element => {
  return (
    <Layout>
      <h1 className="mb-5 text-stone-100 text-4xl">Password Input</h1>
      <div>
        <Password
          label="Password"
          placeholder="Password"
          checkUppercase
          checkLowercase
          checkOneNumber
          checkSpecialChar
          checkLonger={7}
        />
      </div>
    </Layout>
  );
};

export default DemoPassword;
