import { IProducts } from '@/interfaces/products.interfaces';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd'


const ProductSpecifications = ({ product }: { product: IProducts }) => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Product Details',
            children: <div dangerouslySetInnerHTML={{ __html: product.description }} />
        },
        {
            key: '2',
            label: 'Return Policy',
            children: <div dangerouslySetInnerHTML={{ __html: product.description }} />
        },
        {
            key: '3',
            label: 'Reviews',
            children: <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum labore recusandae nulla incidunt deserunt cum cumque expedita sapiente necessitatibus veniam ex quod dolore repellat maxime optio eius odio, deleniti temporibus cupiditate maiores. Nesciunt enim minus dolores, hic distinctio recusandae accusantium exercitationem repellendus aspernatur harum voluptas quaerat unde ad aperiam.
            </div>
        },
        {
            key: '4',
            label: 'Questions ',
            children: <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum labore recusandae nulla incidunt deserunt cum cumque expedita sapiente necessitatibus veniam ex quod dolore repellat maxime optio eius odio, deleniti temporibus cupiditate maiores. Nesciunt enim minus dolores, hic distinctio recusandae accusantium exercitationem repellendus aspernatur harum voluptas quaerat unde ad aperiam.
            </div>
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}

export default ProductSpecifications;