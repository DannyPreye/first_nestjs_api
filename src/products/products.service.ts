/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService
{
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number)
    {
        const productId = Math.random().toString();
        const newProduct = new Product(
            productId,
            title,
            description,
            price,
        );

        this.products.push(newProduct);

        return productId;
    }

    getProducts()
    {
        return [ ...this.products ];
    }

    getSingleProduct(id: string)
    {
        const product = this.findProduct(id)[ 0 ];

        return { ...product };


    }

    updateProduct(id: string, body: { title: string, description: string, price: number; })
    {

        const [ product, index ] = this.findProduct(id);
        this.products[ index ] = { ...product, ...body };



    }

    private findProduct(id: string): [ Product, number ]
    {
        const productIndex = this.products.findIndex(prod => (prod.id === id));

        console.log(productIndex);

        const product = this.products[ productIndex ];

        if (!product) {
            throw new NotFoundException("Could not find product.");

        }

        return [ product, productIndex ];
    }
}
