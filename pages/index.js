import Layout from "../components/layout/Layout";
import Home from "../components/home/Home";

import { getTents } from "../state/actions/tentsAction";
import { wrapper } from "../state/store";

export default function Index() {
  return (
    <div>
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      await store.dispatch(getTents(req));
    }
);
