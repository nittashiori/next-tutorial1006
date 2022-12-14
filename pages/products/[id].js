import Link from "next/link";
import Image from 'next/image'
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'

// SSGの場合
export async function getStaticProps({params}) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${params.id}.json`);
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const data = await req.json();

  return {
    props: {
      product: data
    }
  }
}

export async function getStaticPaths() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products.json`);
  const data = await req.json();

  const paths = data.map(product => {
    return {
      params: {
        id: product,
      }
    }
  });

  return {
    paths,
    fallback: false,
  }
}

// SSRの場合
// export async function getServerSideProps({params}) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const data = await req.json();

//   return {
//     props: {
//       product: data
//     }
//   }
// }

const Product = ({ product }) => {
  const  router = useRouter();
  console.log(router.query)
  const { id } = router.query;
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{id}のページです</h1>
        <Image src={product.image} width={300} height={400} alt="" />
        <p>{product.name}</p>
        <br />
        <Link href="/products">
          <a>商品一覧へ</a>
        </Link>
      </main>
    </div>
  );
}

export default Product;