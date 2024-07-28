import Link from "next/link";
import classes from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className={classes.main}>
        <div className={classes.header}>
          <h1>The tool to standardize your recipes</h1>
        </div>
        <div className={classes.gridContainer}>
          <div className={classes.gridItem}>
            <div className={classes.stepContent}>
              <div className={classes.imageContainer}>
                <Image
                  src="/assets/images/_a3dca2cc-34bd-41ad-9b44-748af0181f62.jpeg"
                  alt="Join for free"
                  layout="responsive"
                  width={100}
                  height={100}
                  className={classes.stepImage}
                />
              </div>
            </div>
            <button type="button" className={classes.stepButton}>
              Join for free
            </button>
          </div>
          <div className={classes.gridItem}>
            <div className={classes.stepContent}>
              <div className={classes.imageContainer}>
                <Image
                  src="/assets/images/_d22b7097-765c-4c6f-9a7f-a5ccd82ce041.jpeg"
                  alt="Create your recipe"
                  layout="responsive"
                  width={100}
                  height={100}
                  className={classes.stepImage}
                />
              </div>
            </div>
            <button type="button" className={classes.stepButton}>
              Create your recipe
            </button>
          </div>
          <div className={classes.gridItem}>
            <div className={classes.stepContent}>
              <div className={classes.imageContainer}>
                <Image
                  src="/assets/images/_a390b682-5cda-49cf-b463-2a5849046b08.jpeg"
                  alt="Make it standard"
                  layout="responsive"
                  width={100}
                  height={100}
                  className={classes.stepImage}
                />
              </div>
            </div>
            <button type="button" className={classes.stepButton}>
              Make it standard
            </button>
          </div>
          <div className={classes.gridItem}>
            <div className={classes.stepContent}>
              <div className={classes.imageContainer}>
                <Image
                  src="/assets/images/_9c220d41-86d9-4038-960d-06c2ce7957fe.jpeg"
                  alt="Get your production cost and sale price"
                  layout="responsive"
                  width={100}
                  height={100}
                  className={classes.stepImage}
                />
              </div>
            </div>
            <button type="button" className={classes.stepButton}>
              Get production cost and sale price
            </button>
          </div>
        </div>
        <div className={classes.footer}>
          <h2>By standardizing you can...</h2>
          <ul className={classes.goalsList}>
            <li>Get always the same product quality</li>
            <li>
              Be able to calculate the exact weight of each ingredient according
              to your purposes.
            </li>
            <li>Optimize production costs and sales prices</li>
            <li>Increase profitability</li>
          </ul>
        </div>
        <div className={classes.copyright}>
          <p>
            © {new Date().getFullYear()} Formula 4 All. All rights reserved.
          </p>
        </div>
      </main>
    </>
  );
}
