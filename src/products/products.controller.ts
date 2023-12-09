/* eslint-disable prettier/prettier */
import { ProductService } from './products.service';

import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';

@Controller('products')
export class ProductsController
{

    constructor (private readonly productService: ProductService)
    {

    }

    @Post()
    addProduct(@Body("title") productTitle: string, @Body("description") productdesc: string, @Body("title") productPrice: number): any
    {
        const res = this.productService.insertProduct(productTitle, productdesc, productPrice);

        return { id: res };
    }

    @Get()
    getAllProducts()
    {
        return this.productService.getProducts();
    }

    @Get(":id")
    getSingleProduct(@Param("id") productId: string)
    {
        return this.productService.getSingleProduct(productId);
    }

    @Patch(":id")
    updateProduct(@Param("id") productId: string, @Body("title") title: string, @Body("description") description: string, @Body("price") price: number)
    {
        this.productService.updateProduct(productId, { title, description, price });
    }

}
