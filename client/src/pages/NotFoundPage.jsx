import { Link } from "react-router-dom";
import Card from "../components/common/Card";

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <Card className="max-w-lg text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">404</p>
      <h1 className="mt-4 font-display text-5xl text-stone-900 dark:text-white">This page does not exist</h1>
      <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
        The memory you were looking for could not be found.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-stone-900"
      >
        Return Home
      </Link>
    </Card>
  </div>
);

export default NotFoundPage;
