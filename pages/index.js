// Import Link so users can navigate to individual blog posts.
import Link from 'next/link';

// Import Date so blog post dates can be displayed in a consistent format.
import Date from '../components/date';

// Import the custom CSS module for the homepage.
import styles from '../styles/Home.module.css';

// Import Head so the homepage can define its browser title.
import Head from 'next/head';

// Import the shared Layout component and the site's title.
import Layout, { siteTitle } from '../components/layout';

// Import reusable CSS utility classes.
import utilStyles from '../styles/utils.module.css';

// Import the function that retrieves and sorts the JSON blog posts.
import { getSortedPostsData } from '../lib/posts-firebase';


// Generate the blog post data at build time.
export async function getStaticProps() {
  // Retrieve all posts from the JSON data file.
  const allPostsData = await getSortedPostsData();

  // Return the blog post data as properties for the Home component.
  return {
    // Store the blog post data inside the props object.
    props: {
      // Pass all of the blog post data to the Home component.
      allPostsData,
    },
  };
}

// Create the homepage and receive the blog post data as a prop.
export default function Home({ allPostsData }) {
  // Return the JSX that creates the homepage.
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${styles.card}`}>
        <p>My name is Colby and I enjoy cooking and hiking outside.</p>
        <p>
          This is my personal blog where I share some of my interests and
          experiences.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${styles.blogSection}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li
              className={`${utilStyles.listItem} ${styles.postItem}`}
              key={id}
            >
              <Link href={`/posts/${id}`} className={styles.postLink}>
                {title}
              </Link>

              <br />

              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
